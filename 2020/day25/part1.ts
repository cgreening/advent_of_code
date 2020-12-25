import { isConstructorDeclaration } from "typescript";
import numbers from "../day5/seat_numbers";

function day25Part1(n1: number, n2: number) {
  const decrypt = (n1: number, n2: number) => {
    let searchValue = 1;
    let result = 1;
    while (true) {
      result = (result * n2) % 20201227;
      searchValue = (searchValue * 7) % 20201227;
      if (searchValue === n1) {
        return result;
      }
    }
  };

  console.time("day25");
  const result = decrypt(n1, n2);
  console.timeEnd("day25");
  console.log("Part1", result);
}

// example day25Part1(5764801n, 17807724n);
day25Part1(1965712, 19072108);
