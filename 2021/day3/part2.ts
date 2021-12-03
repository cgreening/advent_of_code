import fs from "fs";

function getMostCommonForOxygen(binary: string[][], position: number) {
  let count0 = 0;
  let count1 = 0;
  for (let b of binary) {
    if (b[position] === "1") {
      count1++;
    } else {
      count0++;
    }
  }
  if (count1 >= count0) {
    return "1";
  }
  return "0";
}

function getMostCommonForCO2(binary: string[][], position: number) {
  let count0 = 0;
  let count1 = 0;
  for (let b of binary) {
    if (b[position] === "1") {
      count1++;
    } else {
      count0++;
    }
  }
  if (count0 <= count1) {
    return "0";
  }
  return "1";
}

function filterBinary(binary: string[][], position: number, value: string) {
  return binary.filter((b) => b[position] === value);
}

function part2() {
  const raw = fs.readFileSync(__dirname + "/numbers.txt", {
    encoding: "utf-8",
  });

  const binary = raw.split("\n").map((line) => line.split(""));
  const bitLength = binary[0].length;

  let oxygen = binary;
  let position = 0;
  while (oxygen.length > 1 && position < bitLength) {
    const mostCommon = getMostCommonForOxygen(oxygen, position);
    oxygen = filterBinary(oxygen, position, mostCommon);
    position++;
  }
  if (oxygen.length > 1) {
    throw new Error("Could not find the oxygen system");
  }
  const oxygenSystem = parseInt(oxygen[0].join(""), 2);

  let co2 = binary;
  position = 0;
  while (co2.length > 1 && position < bitLength) {
    const mostCommon = getMostCommonForCO2(co2, position);
    co2 = filterBinary(co2, position, mostCommon);
    position++;
  }
  if (co2.length > 1) {
    throw new Error("Could not find the co2 system");
  }
  const co2System = parseInt(co2[0].join(""), 2);

  console.log(oxygenSystem, co2System, oxygenSystem * co2System);
}

part2();
