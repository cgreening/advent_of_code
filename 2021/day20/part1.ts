import fs from "fs";
import Heap from "heap-js";

function parseData(filename: string) {
  const lines = fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .filter((line) => line.length > 0);

  const filter = lines.shift()!;

  const padding = new Array(100).fill(".");

  const data = lines.map((line) => [...padding, ...line.split(""), ...padding]);

  const paddingTop = new Array(100)
    .fill(null)
    .map(() => new Array(data[0].length).fill("."));
  const paddingBottom = new Array(100)
    .fill(null)
    .map(() => new Array(data[0].length).fill("."));

  return {
    filter: filter.split(""),
    data: [...paddingTop, ...data, ...paddingBottom],
  };
}

function part1() {
  const { filter, data } = parseData("2021/day20/input.txt");
  console.log(data.map((row) => row.join("")).join("\n"));

  let result = data;
  for (let pass = 0; pass < 50; pass++) {
    // get the width and height
    const width = result[0].length;
    const height = result.length;
    const newImage = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(pass % 2 == 0 ? "#" : "."));
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let binaryString = "";
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            binaryString += result[y + dy][x + dx] === "#" ? "1" : "0";
          }
        }
        // if (binaryString.includes("1")) {
        const binary = parseInt(binaryString, 2);
        newImage[y][x] = filter[binary];
        // }
      }
    }
    result = newImage;
    // console.log();
    // console.log(result.map((row) => row.join("")).join("\n"));
  }
  let count = 0;
  for (let y = 1; y < result.length - 1; y++) {
    for (let x = 1; x < result[y].length - 1; x++) {
      if (result[y][x] === "#") {
        count++;
      }
    }
  }
  console.log(count);
}

part1();
