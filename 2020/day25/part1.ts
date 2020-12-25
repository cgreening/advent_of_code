import { isConstructorDeclaration } from "typescript";
import numbers from "../day5/seat_numbers";

function day25Part1(n1: number, n2: number) {
  const divisor = 20201227;
  const transform = (subjectNumber: number, loops: number) => {
    let value = 1;
    for (let i = 0; i < loops; i++) {
      value = value * subjectNumber;
      value = value % divisor;
    }
    return value;
  };

  const calcLoops = (finalNumber: number) => {
    let value = 1;
    let loops = 1;
    while (true) {
      value = value * 7;
      value = value % divisor;
      if (value === finalNumber) {
        return loops;
      }
      loops++;
    }
  };

  console.time("day25");
  const doorLoops = calcLoops(n2);
  const result = transform(n1, doorLoops);
  console.timeEnd("day25");
  console.log("Part1", result);
}

// example day25Part1(5764801n, 17807724n);
day25Part1(1965712, 19072108);
