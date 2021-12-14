import fs from "fs";

function parseInput(file: string) {
  const lines = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split("").map((char) => parseInt(char, 10)));
  console.log(lines);
  return lines;
}

function flash(
  data: number[][],
  x: number,
  y: number,
  flashers: Set<number>,
  width: number,
  height: number
) {
  if (!flashers.has(y * width + x)) {
    flashers.add(y * width + x);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx !== 0 || dy !== 0) {
          const newX = x + dx;
          const newY = y + dy;
          if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
            data[newY][newX]++;
            if (data[newY][newX] > 9) {
              flash(data, newX, newY, flashers, width, height);
            }
          }
        }
      }
    }
  }
}

function part1() {
  const data = parseInput("./2021/day11/input.txt");
  const width = data[0].length;
  const height = data.length;
  let flashes = 0;
  for (let step = 0; step < 1000; step++) {
    // console.log(step);
    // console.log(data.map((row) => row.join("")).join("\n"));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        data[y][x]++;
      }
    }
    // find all the flashers
    const flashers = new Set<number>();
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[y][x] > 9) {
          flash(data, x, y, flashers, width, height);
        }
      }
    }
    if (flashers.size == 100) {
      console.log("All flashed on step", step + 1);
      return;
    }
    flashes += flashers.size;
    // set all the flashers to 0
    flashers.forEach((index) => {
      data[Math.floor(index / width)][index % width] = 0;
    });
  }
  console.log(flashes);
}

part1();
