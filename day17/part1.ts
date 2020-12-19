import { X_OK } from "constants";
import { isAccessor } from "typescript";
{
  class Sparse4DArray {
    activeCount = 0;
    // this could be more efficient - we can work out x,y,z,w from the key so we could use the keys
    potentiallyActive: {
      [key: number]: { x: number; y: number; z: number; w: number };
    } = {};
    memory = new Set<number>();
    getKey(x: number, y: number, z: number, w: number) {
      // big assumption here that we don't go out of range!!!!
      return x * 100 * 100 * 100 + y * 100 * 100 + z * 100 + w;
    }
    getValue(x: number, y: number, z: number, w: number): boolean {
      const key = this.getKey(x, y, z, w);
      return this.memory.has(key);
    }
    setValue(x: number, y: number, z: number, w: number, value: boolean) {
      const key = this.getKey(x, y, z, w);
      this.activeCount++;
      this.memory.add(key);
      // update the potentially active list
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            for (let dw = -1; dw <= 1; dw++) {
              this.potentiallyActive[
                this.getKey(x + dx, y + dy, z + dz, w + dw)
              ] = {
                x: x + dx,
                y: y + dy,
                z: z + dz,
                w: w + dw,
              };
            }
          }
        }
      }
    }
  }

  function day17Part1(input: string) {
    function simulate(cube: Sparse4DArray): Sparse4DArray {
      const result = new Sparse4DArray();
      Object.values(cube.potentiallyActive).forEach((coords) => {
        const { x, y, z, w } = coords;
        let activeNeighbours = 0;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              for (let dw = -1; dw <= 1; dw++) {
                if (dx == 0 && dy == 0 && dz == 0 && dw == 0) {
                  continue;
                }
                if (cube.getValue(x + dx, y + dy, z + dz, w + dw)) {
                  activeNeighbours++;
                }
              }
            }
          }
        }
        if (cube.getValue(x, y, z, w)) {
          if (activeNeighbours === 2 || activeNeighbours === 3) {
            result.setValue(x, y, z, w, true);
          }
        } else {
          if (activeNeighbours === 3) {
            result.setValue(x, y, z, w, true);
          }
        }
      });
      return result;
    }

    let cube = new Sparse4DArray();
    input.split("\n").forEach((yRow, y) => {
      yRow.split("").forEach((isActive, x) => {
        cube.setValue(x, y, 0, 0, isActive === "#");
      });
    });
    console.time("day17Part2");
    for (let i = 0; i < 6; i++) {
      // console.log(Object.keys(cube.potentiallyActive).length);
      cube = simulate(cube);
    }
    console.timeEnd("day17Part2");
    return cube.activeCount;
  }
  console.log(
    day17Part1(
      `##......
.##...#.
.#######
..###.##
.#.###..
..#.####
##.####.
##..#.##`
    )
  );
}
