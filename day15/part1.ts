function day15_part2(numbers: number[]) {
  const cache = new Array<{ lastSpoken: number; previousSpoken: number }>(
    30000000
  );

  function computeNewNumber(spoken: number) {
    const turnSpoken = cache[spoken];
    // first time spoken
    if (
      !turnSpoken ||
      turnSpoken.lastSpoken === -1 ||
      turnSpoken.previousSpoken === -1
    ) {
      return 0;
    }
    return turnSpoken.lastSpoken - turnSpoken.previousSpoken;
  }

  numbers.forEach((number, index) => {
    cache[number] = { lastSpoken: -1, previousSpoken: index + 1 };
  });

  let newNumber = numbers[numbers.length - 1];
  for (let i = numbers.length; i < 30000000; i++) {
    newNumber = computeNewNumber(newNumber);
    const entry = cache[newNumber];
    if (entry) {
      if (entry.lastSpoken === -1) {
        entry.lastSpoken = i + 1;
      } else {
        entry.previousSpoken = entry.lastSpoken;
        entry.lastSpoken = i + 1;
      }
    } else {
      cache[newNumber] = { lastSpoken: i + 1, previousSpoken: -1 };
    }
  }
  return newNumber;
}
console.time("day15_part2");
const result = day15_part2([7, 14, 0, 17, 11, 1, 2]);
console.timeEnd("day15_part2");
console.log(result);
