import { isWhiteSpaceLike } from "typescript";

const adaptors = [
  99,
  128,
  154,
  160,
  61,
  107,
  75,
  38,
  15,
  11,
  129,
  94,
  157,
  84,
  121,
  14,
  119,
  48,
  30,
  10,
  55,
  108,
  74,
  104,
  91,
  45,
  134,
  109,
  164,
  66,
  146,
  44,
  116,
  89,
  79,
  32,
  149,
  1,
  136,
  58,
  96,
  7,
  60,
  23,
  31,
  3,
  65,
  110,
  90,
  37,
  43,
  115,
  122,
  52,
  113,
  123,
  161,
  50,
  95,
  150,
  120,
  101,
  126,
  151,
  114,
  127,
  73,
  82,
  162,
  140,
  51,
  144,
  36,
  4,
  163,
  85,
  42,
  59,
  67,
  64,
  86,
  49,
  2,
  145,
  135,
  22,
  24,
  33,
  137,
  16,
  27,
  70,
  133,
  130,
  20,
  21,
  83,
  143,
  100,
  41,
  76,
  17,
];

const example1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

function count(adaptors: number[]) {
  // need to momoize
  const memo: { [key: number]: number } = {};
  // want to reach the max adaptor
  const target = adaptors.reduce((m, c) => Math.max(m, c), 0);
  // quick lookup of available adaptors
  const available = new Set<number>(adaptors);
  // recursive count
  function recurse(
    currentJolts: number,
    target: number,
    available: Set<number>
  ): number {
    // check the memoized results
    if (currentJolts in memo) {
      return memo[currentJolts];
    }
    // did we reach the target?
    if (currentJolts === target) {
      return 1;
    }
    // check all the paths from the current value
    let result = 0;
    for (let i = 1; i <= 3; i++) {
      if (available.has(currentJolts + i)) {
        result += recurse(currentJolts + i, target, available);
      }
    }
    // memoize the resutls for next time
    memo[currentJolts] = result;
    return result;
  }
  return recurse(0, target, available);
}

console.time("Search");
console.log(count(adaptors));
console.timeEnd("Search");

function dp(adaptors: number[]) {
  const max = adaptors.reduce((m, c) => Math.max(m, c), 0);
  adaptors.push(max + 3);
  const lookup = new Set(adaptors);
  const cache = new Array<number>(max + 1);
  cache[0] = 1;
  for (let i = 1; i <= max + 3; i++) {
    let count = 0;
    if (lookup.has(i)) {
      count = (cache[i - 1] || 0) + (cache[i - 2] || 0) + (cache[i - 3] || 0);
    }
    cache[i] = count;
  }
  // console.log(cache);
  return cache[max + 3];
}

console.time("fast");
const result = dp(adaptors);
console.timeEnd("fast");
console.log(result);
