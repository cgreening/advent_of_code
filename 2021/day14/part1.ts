import fs from "fs";

function parseData(filename: string) {
  const lines = fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .filter((line) => line.length > 0);

  const template = lines.shift()!;

  const pairs = lines.reduce((acc, line) => {
    const [key, value] = line.split(" -> ");
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });

  return { template, pairs };
}

function part1() {
  const { template, pairs } = parseData("./2021/day14/input.txt");
  // simple naive brute force
  let result = template;
  for (let step = 0; step < 10; step++) {
    let newResult = result[0];
    let char1 = result[0];
    let char2 = "";
    for (let i = 1; i < result.length; i++) {
      char2 = result[i];
      newResult += (pairs[char1 + char2] || "") + char2;
      char1 = char2;
    }
    result = newResult;
  }
  // get all the letters
  const array = result.split("");
  const letters = [...new Set(array)];
  // count them
  const counts = letters.map(
    (letter) => array.filter((c) => c === letter).length
  );
  // get the result
  let sorted = counts.sort((a, b) => a - b);
  // console.log(sorted);
  console.log(sorted[sorted.length - 1] - sorted[0]);
}

function part2() {
  const { template, pairs } = parseData("./2021/day14/input.txt");
  // keep track of counts of each pair
  let pairCounts: { [key: string]: number } = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    pairCounts[pair] = (pairCounts[pair] || 0) + 1;
  }
  // run the steps
  for (let step = 0; step < 40; step++) {
    let newPairCounts: { [key: string]: number } = {};
    Object.keys(pairCounts).forEach((pair) => {
      // if the pair is not in the pairs mapping then just copy it accross
      if (!pairs[pair]) {
        newPairCounts[pair] = pairCounts[pair];
      } else {
        // process the pair
        const [left, right] = pair.split("");
        const leftPair = left + pairs[pair];
        const rightPair = pairs[pair] + right;
        newPairCounts[leftPair] =
          (newPairCounts[leftPair] || 0) + pairCounts[pair];
        newPairCounts[rightPair] =
          (newPairCounts[rightPair] || 0) + pairCounts[pair];
      }
    });
    pairCounts = newPairCounts;
  }
  // count the letters
  const counts: { [key: string]: number } = {};
  // add the first character in as it won't be counted otherwise
  counts[template[0]] = 1;
  // add the second character of each pair
  Object.keys(pairCounts).forEach((pair) => {
    const [_left, right] = pair.split("");
    if (counts[right]) {
      counts[right] += pairCounts[pair];
    } else {
      counts[right] = pairCounts[pair];
    }
  });
  const sorted = Object.values(counts).sort((a, b) => a - b);
  // console.log(sorted);
  console.log(sorted[sorted.length - 1] - sorted[0]);
}

part1();
part2();
