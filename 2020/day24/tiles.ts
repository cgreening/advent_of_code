import fs from "fs";
import { Sparse3DArray } from "../../helpers/arrays";
function day24Part1(input: string) {
  // https://www.redblobgames.com/grids/hexagons/
  const directions: {
    [key: string]: { dx: number; dy: number; dz: number };
  } = {
    e: { dx: +1, dy: -1, dz: 0 },
    ne: { dx: +1, dy: 0, dz: -1 },
    nw: { dx: 0, dy: +1, dz: -1 },
    w: { dx: -1, dy: +1, dz: 0 },
    sw: { dx: -1, dy: 0, dz: +1 },
    se: { dx: 0, dy: -1, dz: +1 },
  };

  const instructions = fs
    .readFileSync(__dirname + input, { encoding: "utf-8" })
    .split("\n")
    .map((line) =>
      line.match(/e|ne|nw|w|sw|se/g)!.map((direction) => directions[direction])
    );

  class TilesArray extends Sparse3DArray {
    potentiallyActive: Map<
      number,
      { x: number; y: number; z: number }
    > = new Map();
    updatePotential(x: number, y: number, z: number) {
      Object.values(directions).forEach((direction) => {
        this.potentiallyActive.set(
          this.getKey(x + direction.dx, y + direction.dy, z + direction.dz),
          {
            x: x + direction.dx,
            y: y + direction.dy,
            z: z + direction.dz,
          }
        );
      });
      this.potentiallyActive.set(this.getKey(x, y, z), {
        x,
        y,
        z,
      });
    }
    flipValue(x: number, y: number, z: number) {
      const result = super.flipValue(x, y, z);
      if (result) {
        this.updatePotential(x, y, z);
      }
      return result;
    }
  }

  console.time("Part1");
  const tiles = new TilesArray(200);
  instructions.forEach((instruction) => {
    const { x, y, z } = instruction.reduce(
      (position, direction) => ({
        x: position.x + direction.dx,
        y: position.y + direction.dy,
        z: position.z + direction.dz,
      }),
      { x: 0, y: 0, z: 0 }
    );
    tiles.flipValue(x, y, z);
  });
  console.timeEnd("Part1");
  console.log("Part1", tiles.activeCount);

  console.time("Part2");
  for (let i = 0; i < 100; i++) {
    // console.log(tiles.activeCount);
    const flipList = new Array<{ x: number; y: number; z: number }>();
    tiles.potentiallyActive.forEach((coords) => {
      const blackCount = Object.values(directions).reduce(
        (count, direction) =>
          count +
          (tiles.getValue(
            coords.x + direction.dx,
            coords.y + direction.dy,
            coords.z + direction.dz
          )
            ? 1
            : 0),
        0
      );
      if (tiles.getValue(coords.x, coords.y, coords.z)) {
        // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
        if (blackCount === 0 || blackCount > 2) {
          flipList.push(coords);
        }
      } else {
        // Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
        if (blackCount === 2) {
          flipList.push(coords);
        }
      }
    });
    flipList.forEach((coords) => tiles.flipValue(coords.x, coords.y, coords.z));
  }
  console.timeEnd("Part2");
  console.log("Part2", tiles.activeCount);
}

day24Part1("/input.txt");
// day24Part1("/example.txt");
