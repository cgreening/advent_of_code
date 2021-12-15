import fs from "fs";
import Heap from "heap-js";

function parseData(filename: string) {
  return fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split("").map((c) => parseInt(c, 10)));
}

function dumpMap(map: number[][]) {
  console.log(map.map((row) => row.join("")).join("\n"));
}

function part1_dynamic() {
  const map = parseData("./2021/day15/input.txt");
  const width = map[0].length;
  const height = map.length;

  const risk = new Array<number[]>(height);
  for (let y = 0; y < height; y++) {
    risk[y] = new Array<number>(width);
  }
  const directions = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
  ];

  let best = Number.MAX_VALUE;
  let current = 0;
  while (best != current) {
    best = current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (x == 0 && y == 0) {
          continue;
        }
        let scores = [];
        for (let i = 0; i < directions.length; i++) {
          const d = directions[i];
          const newX = x + d.dx;
          const newY = y + d.dy;
          if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
            scores.push(risk[newY][newX] || 0);
          }
        }
        risk[y][x] = Math.min(...scores) + map[y][x];
      }
    }
    current = risk[height - 1][width - 1];
  }
  console.log(best);
}

function search(map: Array<number[]>) {
  const width = map[0].length;
  const height = map.length;
  // add the next possible paths
  const directions = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
  ];

  // use a min heap to make it easier to pop off path with the lowest risk
  const heapSorter = (
    a: { x: number; y: number; risk: number },
    b: { x: number; y: number; risk: number }
  ) => a.risk - b.risk;

  const heap = new Heap(heapSorter);

  const visited = new Set<string>();
  // start off in the top left corner with 0 risk
  heap.push({ x: 0, y: 0, risk: 0 });
  // mark it as visited
  visited.add("0,0");

  while (heap.length > 0) {
    // pop off the path with the lowest risk
    const current = heap.pop()!;
    // if we're at the end, we're done
    if (current.x == width - 1 && current.y == height - 1) {
      console.log(current.risk);
      return;
    }
    for (let i = 0; i < directions.length; i++) {
      const d = directions[i];
      const x = current.x + d.dx;
      const y = current.y + d.dy;
      if (
        x >= 0 &&
        x <= width - 1 &&
        y >= 0 &&
        y <= height - 1 &&
        !visited.has(`${x},${y}`)
      ) {
        visited.add(`${x},${y}`);
        heap.push({
          x: x,
          y: y,
          risk: current.risk + map[x][y],
        });
      }
    }
  }
}

function part1() {
  const map = parseData("./2021/day15/input.txt");
  search(map);
}

function part2() {
  const map = parseData("./2021/day15/input.txt");
  let width = map[0].length;
  let height = map.length;
  // extend the map to the right 4 times
  for (let y = 0; y < height; y++) {
    for (let tile = 1; tile < 5; tile++) {
      for (let x = 0; x < width; x++) {
        let newRisk = map[y][x + (tile - 1) * width] + 1;
        if (newRisk > 9) {
          newRisk = 1;
        }
        map[y].push(newRisk);
      }
    }
  }
  width = width * 5;
  // extend our new map to the bottom 4 times
  for (let tile = 1; tile < 5; tile++) {
    for (let y = 0; y < height; y++) {
      map.push([]);
      for (let x = 0; x < width; x++) {
        let newRisk = map[y + (tile - 1) * height][x] + 1;
        if (newRisk > 9) {
          newRisk = 1;
        }
        map[map.length - 1].push(newRisk);
      }
    }
  }
  search(map);
}

console.time("Part1");
part1();
console.timeEnd("Part1");
console.time("Part1 Dynamic");
part1_dynamic();
console.timeEnd("Part1 Dynamic");
console.time("Part2");
part2();
console.timeEnd("Part2");
