import { isConstructorDeclaration } from "typescript";
import numbers from "../day5/seat_numbers";

function day25Part1(cardNumbr: bigint, doornumber: bigint) {
  const divisor = 20201227n;
  const transform = (subjectNumber: bigint, loops: number) => {
    let value = 1n;
    for (let i = 0; i < loops; i++) {
      value = value * subjectNumber;
      value = value % divisor;
    }
    return value;
  };

  const calcLoops = (finalNumber: bigint) => {
    let value = 1n;
    for (let i = 0; i < 10000000; i++) {
      value = value * 7n;
      value = value % divisor;
      if (value === finalNumber) {
        return i + 1;
      }
    }
    throw new Error("Cannot work out loops");
  };

  const cardLoops = calcLoops(cardNumbr);
  const doorLoops = calcLoops(doornumber);

  const result = transform(cardNumbr, doorLoops);
  console.log("Part1", result);
}

// day25Part1(5764801n, 17807724n);
day25Part1(1965712n, 19072108n);
