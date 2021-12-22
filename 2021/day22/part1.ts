import { count } from "console";
import fs from "fs";
import Heap from "heap-js";

function parseData(filename: string, clip = true) {
  const lines = fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const [command, coords] = line.split(" ");
      const [x, y, z] = coords.split(",").map((coord) => {
        const [_, range] = coord.split("=");
        const [start, end] = range.split("..");
        let startInt = parseInt(start, 10);
        let endInt = parseInt(end, 10);
        if (startInt > endInt) {
          const tmp = endInt;
          endInt = startInt;
          startInt = tmp;
        }
        if (clip) {
          if (startInt < -50) {
            startInt = -50;
          }
          if (endInt < -50) {
            endInt = -50;
          }
          if (startInt > 50) {
            startInt = 50;
          }
          if (endInt > 50) {
            endInt = 50;
          }
        }
        return { start: startInt, end: endInt };
      });
      return {
        command,
        x,
        y,
        z,
      };
    });
  return lines;
}

class InfiniteCube {
  cube: Set<string>;
  on: number;
  constructor() {
    this.cube = new Set<string>();
    this.on = 0;
  }
  set(x: number, y: number, z: number, value: boolean) {
    if (value) {
      if (!this.cube.has(`${x},${y},${z}`)) {
        this.on++;
      }
      this.cube.add(`${x},${y},${z}`);
    } else {
      if (this.cube.has(`${x},${y},${z}`)) {
        this.on--;
      }
      this.cube.delete(`${x},${y},${z}`);
    }
  }
  get(x: number, y: number, z: number) {
    return this.cube.has(`${x},${y},${z}`);
  }
}

function part1() {
  const process = parseData("2021/day22/input.txt");
  console.log(
    process
      .map(
        (line) =>
          line.command +
          " x=" +
          line.x.start +
          ".." +
          line.x.end +
          ",y=" +
          line.y.start +
          ".." +
          line.y.end +
          ",z=" +
          line.z.start +
          ".." +
          line.z.end
      )
      .join("\n")
  );
  const cube = new InfiniteCube();
  for (let command of process) {
    if (command.x.start == command.x.end) {
      continue;
    }
    if (command.y.start == command.y.end) {
      continue;
    }
    if (command.z.start == command.z.end) {
      continue;
    }
    for (let x = command.x.start; x <= command.x.end; x++) {
      for (let y = command.y.start; y <= command.y.end; y++) {
        for (let z = command.z.start; z <= command.z.end; z++) {
          cube.set(x, y, z, command.command === "on");
        }
      }
    }
  }
  console.log(cube.on);
}

class Counter {
  counts: { [key: string]: bigint } = {};
  update(
    {
      x0,
      x1,
      y0,
      y1,
      z0,
      z1,
    }: {
      x0: number;
      x1: number;
      y0: number;
      y1: number;
      z0: number;
      z1: number;
    },
    value: bigint
  ) {
    const key = `${x0},${x1},${y0},${y1},${z0},${z1}`;
    if (this.counts[key]) {
      this.counts[key] += value;
    } else {
      this.counts[key] = value;
    }
  }
  entries() {
    return Object.entries(this.counts).map(([key, value]) => {
      const [x0, x1, y0, y1, z0, z1] = key
        .split(",")
        .map((i) => parseInt(i, 10));
      return { x0, x1, y0, y1, z0, z1, value };
    });
  }
}

function part2() {
  const cubes = parseData("2021/day22/input.txt", false);
  console.log(
    cubes
      .map(
        (line) =>
          line.command +
          " x=" +
          line.x.start +
          ".." +
          line.x.end +
          ",y=" +
          line.y.start +
          ".." +
          line.y.end +
          ",z=" +
          line.z.start +
          ".." +
          line.z.end
      )
      .join("\n")
  );
  // keep track of counts in a cube
  const counts = new Counter();
  for (let cube of cubes) {
    // run through each cube

    // this is the value to set the cube to
    const value = cube.command === "on" ? 1 : -1;
    // cube coords
    const { start: startX, end: endX } = cube.x;
    const { start: startY, end: endY } = cube.y;
    const { start: startZ, end: endZ } = cube.z;

    // run through all the existing cubes
    for (let existing of counts.entries()) {
      // get the intersection of the new cube with the existing cube
      const x0 = Math.max(existing.x0, startX);
      const x1 = Math.min(existing.x1, endX);
      const y0 = Math.max(existing.y0, startY);
      const y1 = Math.min(existing.y1, endY);
      const z0 = Math.max(existing.z0, startZ);
      const z1 = Math.min(existing.z1, endZ);
      // if there is an intersection then need to turn off everything in the intersection
      if (x0 <= x1 && y0 <= y1 && z0 <= z1) {
        counts.update({ x0, x1, y0, y1, z0, z1 }, BigInt(-existing.value));
      }
    }
    // now if the new cube was turning on then need to turn everything on in the new cube
    // we've already turned off anything that overlaps this cube so the count should be correct
    if (value === 1) {
      counts.update(
        { x0: startX, x1: endX, y0: startY, y1: endY, z0: startZ, z1: endZ },
        BigInt(value)
      );
    }
    // console.log(
    //   counts
    //     .entries()
    //     .map(
    //       (entry) =>
    //         `${entry.x0},${entry.x1},${entry.y0},${entry.y1},${entry.z0},${entry.z1} => ${entry.value}`
    //     )
    //     .join("\n")
    // );
  }
  let result = BigInt(0);
  for (let existing of counts.entries()) {
    const { x0, x1, y0, y1, z0, z1, value } = existing;
    result += value * BigInt((x1 - x0 + 1) * (y1 - y0 + 1) * (z1 - z0 + 1));
  }
  console.log(result);
}

part1();
part2();
