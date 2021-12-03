import fs from "fs";

function part1() {
  const raw = fs.readFileSync(__dirname + "/numbers.txt", {
    encoding: "utf-8",
  });

  const binary = raw.split("\n").map((line) => line.split(""));

  const bitLength = binary[0].length;

  const counts = new Array<number>(bitLength).fill(0);

  for (let i = 0; i < binary.length; i++) {
    for (let j = 0; j < bitLength; j++) {
      if (binary[i][j] === "1") {
        counts[j]++;
      }
    }
  }

  const length = binary.length;

  let gamma = "";
  let espilon = "";

  for (let i = 0; i < bitLength; i++) {
    if (counts[i] > length / 2) {
      gamma += "1";
      espilon += "0";
    } else {
      gamma += "0";
      espilon += "1";
    }
  }

  const gammaNumber = parseInt(gamma, 2);
  const espilonNumber = parseInt(espilon, 2);

  console.log(gammaNumber * espilonNumber);
}

part1();
