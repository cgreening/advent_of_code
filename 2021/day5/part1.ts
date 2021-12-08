import fs from "fs";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const test = [
  { x1: 0, y1: 9, x2: 5, y2: 9 },
  { x1: 8, y1: 0, x2: 0, y2: 8 },
  { x1: 9, y1: 4, x2: 3, y2: 4 },
  { x1: 2, y1: 2, x2: 2, y2: 1 },
  { x1: 7, y1: 0, x2: 7, y2: 4 },
  { x1: 6, y1: 4, x2: 2, y2: 0 },
  { x1: 0, y1: 9, x2: 2, y2: 9 },
  { x1: 3, y1: 4, x2: 1, y2: 4 },
  { x1: 0, y1: 0, x2: 8, y2: 8 },
  { x1: 5, y1: 5, x2: 8, y2: 2 },
];

function parse() {
  const raw = fs.readFileSync("./2021/day5/my_input.txt", "utf8");
  const lines = raw.split("\n");
  return lines
    .filter((line) => line.length > 0)
    .map((line) => {
      const [x1y1, x2y2] = line.split(" -> ");
      const [x1, y1] = x1y1.split(",");
      const [x2, y2] = x2y2.split(",");
      return {
        x1: parseInt(x1),
        y1: parseInt(y1),
        x2: parseInt(x2),
        y2: parseInt(y2),
      };
    });
}

function part1() {
  const squares = {} as { [key: string]: boolean };
  const input = parse();
  let count = 0;
  input.forEach((line) => {
    let { x1, y1, x2, y2 } = line;
    if (x1 === x2) {
      if (y1 > y2) {
        let temp = y1;
        y1 = y2;
        y2 = temp;
      }
      for (let y = y1; y <= y2; y++) {
        const key = `x=${x1},y=${y}`;
        console.log(key);
        if (squares[key]) {
          count++;
        } else {
          squares[key] = true;
        }
      }
    } else if (y1 === y2) {
      if (x1 > x2) {
        let temp = x1;
        x1 = x2;
        x2 = temp;
      }
      for (let x = x1; x <= x2; x++) {
        const key = `x=${x},y=${y1}`;
        console.log(key);
        if (squares[key]) {
          count++;
        } else {
          squares[key] = true;
        }
      }
    } else {
      // diagonal
      const dx = x1 < x2 ? 1 : -1;
      const dy = y1 < y2 ? 1 : -1;
      while (x1 !== x2 + dx || y1 !== y2 + dy) {
        const key = `x=${x1},y=${y1}`;
        console.log(key);
        if (squares[key]) {
          count++;
        } else {
          squares[key] = true;
        }
        x1 += dx;
        y1 += dy;
      }
    }
  });
  console.log(count);
}

part1();
