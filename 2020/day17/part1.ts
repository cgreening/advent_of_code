import { Sparse4DArray } from "../../helpers/arrays";
{
  class TrackingSparse4DArray extends Sparse4DArray {
    activeCount = 0;
    // this could be more efficient - we can work out x,y,z,w from the key so we could use the keys
    potentiallyActive: {
      [key: number]: { x: number; y: number; z: number; w: number };
    } = {};
    setValue(x: number, y: number, z: number, w: number) {
      super.setValue(x, y, z, w);
      this.activeCount++;
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
    function simulate(cube: TrackingSparse4DArray): TrackingSparse4DArray {
      const result = new TrackingSparse4DArray(100);
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
            result.setValue(x, y, z, w);
          }
        } else {
          if (activeNeighbours === 3) {
            result.setValue(x, y, z, w);
          }
        }
      });
      return result;
    }

    let cube = new TrackingSparse4DArray(100);
    input.split("\n").forEach((yRow, y) => {
      yRow.split("").forEach((isActive, x) => {
        if (isActive === "#") {
          cube.setValue(x, y, 0, 0);
        }
      });
    });
    console.time("day17Part2");
    for (let i = 0; i < 6; i++) {
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
