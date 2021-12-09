import fs from "fs";

function parseInput(file: string) {
  const lines = fs.readFileSync(file, "utf-8").split("\n");
  const data = lines.map((line) => line.split("").map((n) => parseInt(n, 10)));
  return data;
}

function part1() {
  const map = parseInput("./2021/day9/input.txt");
  // console.log(map.map((r) => r.join("")).join("\n"));

  const height = map.length;
  const width = map[0].length;

  let score = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const up = y > 0 ? map[y - 1][x] : Number.POSITIVE_INFINITY;
      const down = y < height - 1 ? map[y + 1][x] : Number.POSITIVE_INFINITY;
      const left = x > 0 ? map[y][x - 1] : Number.POSITIVE_INFINITY;
      const right = x < width - 1 ? map[y][x + 1] : Number.POSITIVE_INFINITY;

      const current = map[y][x];
      if (current < up && current < down && current < left && current < right) {
        score += 1 + current;
      }
    }
  }
}

function fill(x: number, y: number, map: number[][]) {
  const frontier = [100 * y + x];
  const explored = new Set<number>();
  explored.add(100 * y + x);
  const height = map.length;
  const width = map[0].length;

  let count = 0;
  while (frontier.length > 0) {
    let current = frontier.pop() || 0;
    let [y, x] = [Math.floor(current / 100), current % 100];
    // console.log(x, y, map[y][x]);
    count++;
    const value = map[y][x];
    if (
      x > 0 &&
      map[y][x - 1] > value &&
      map[y][x - 1] !== 9 &&
      !explored.has(100 * y + x - 1)
    ) {
      explored.add(100 * y + x - 1);
      frontier.push(100 * y + x - 1);
    }
    if (
      x < width - 1 &&
      map[y][x + 1] > value &&
      map[y][x + 1] !== 9 &&
      !explored.has(100 * y + x + 1)
    ) {
      explored.add(100 * y + x + 1);
      frontier.push(100 * y + x + 1);
    }
    if (
      y > 0 &&
      map[y - 1][x] > value &&
      map[y - 1][x] !== 9 &&
      !explored.has(100 * (y - 1) + x)
    ) {
      explored.add(100 * (y - 1) + x);
      frontier.push(100 * (y - 1) + x);
    }
    if (
      y < height - 1 &&
      map[y + 1][x] > value &&
      map[y + 1][x] !== 9 &&
      !explored.has(100 * (y + 1) + x)
    ) {
      explored.add(100 * (y + 1) + x);
      frontier.push(100 * (y + 1) + x);
    }
  }
  return count;
}

function part2() {
  const map = parseInput("./2021/day9/input.txt");

  const height = map.length;
  const width = map[0].length;

  const lowPoints: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const up = y > 0 ? map[y - 1][x] : Number.POSITIVE_INFINITY;
      const down = y < height - 1 ? map[y + 1][x] : Number.POSITIVE_INFINITY;
      const left = x > 0 ? map[y][x - 1] : Number.POSITIVE_INFINITY;
      const right = x < width - 1 ? map[y][x + 1] : Number.POSITIVE_INFINITY;

      const current = map[y][x];
      if (current < up && current < down && current < left && current < right) {
        lowPoints.push({ x, y });
      }
    }
  }
  // console.log(lowPoints);

  let counts = [];
  for (let lowPoint of lowPoints) {
    const count = fill(lowPoint.x, lowPoint.y, map);
    counts.push(count);
  }
  // console.log(counts);
  counts.sort((a, b) => b - a);
  console.log(counts[0] * counts[1] * counts[2]);
}

part1();
part2();
