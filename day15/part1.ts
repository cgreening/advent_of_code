import { compileFunction } from "vm";

function part1(numbers: number[]) {
  const lastSpoken: {
    [key: number]: { lastSpoken: number; previousSpoken: number };
  } = {};
  function computeNewNumber(spoken: number) {
    const turnSpoken = lastSpoken[spoken];
    // first time spoken
    if (
      !turnSpoken ||
      turnSpoken.lastSpoken === -1 ||
      turnSpoken.previousSpoken === -1
    ) {
      //   console.log(`${spoken} not seen before`);
      return 0;
    }
    // console.log(`${spoken} was spoken on ${turnSpoken} and ${spokenBefore}`);
    return turnSpoken.lastSpoken - turnSpoken.previousSpoken;
  }

  numbers.forEach((number, index) => {
    lastSpoken[number] = { lastSpoken: -1, previousSpoken: index + 1 };
  });

  let newNumber = numbers[numbers.length - 1];
  for (let i = numbers.length; i < 30000000; i++) {
    if (i % 100000 === 0) {
      console.log(i, Math.floor(i / 300000));
    }
    newNumber = computeNewNumber(newNumber);
    // console.log(`Turn ${i + 1}, spoken ${newNumber}`);
    const cache = lastSpoken[newNumber];
    if (cache) {
      if (cache.lastSpoken === -1) {
        cache.lastSpoken = i + 1;
      } else {
        cache.previousSpoken = cache.lastSpoken;
        cache.lastSpoken = i + 1;
      }
    } else {
      lastSpoken[newNumber] = { lastSpoken: i + 1, previousSpoken: -1 };
    }
  }
  return newNumber;
}

const result = part1([7, 14, 0, 17, 11, 1, 2]);
console.log(result);
