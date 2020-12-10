const input = [
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

const example1 = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];

// depth first search
function findPath(
  start: number,
  dest: number,
  available: Set<number>,
  path: number[]
) {
  path.push(start);
  if (start === dest) {
    return true;
  }
  for (let i = 1; i <= 3; i++) {
    if (available.has(start + i)) {
      if (findPath(start + i, dest, available, path)) {
        return true;
      }
    }
  }
  // backtrack
  path.pop();
  return false;
}

function solve(adaptors: number[]) {
  // work out the final value we want
  const dest = adaptors.reduce((max, current) => Math.max(max, current)) + 3;
  // add it to the list of adaptors
  adaptors.push(dest);
  const path: number[] = [];
  // find a path from 0 jolts to the destination recording the path
  if (findPath(0, dest, new Set(adaptors), path)) {
    let difference1 = 0;
    let difference3 = 0;
    for (let i = 1; i < path.length; i++) {
      const difference = path[i] - path[i - 1];
      if (difference === 1) {
        difference1++;
      }
      if (difference === 3) {
        difference3++;
      }
    }
    return difference1 * difference3;
  }
}
console.time("Solve");
const result = solve(input);
console.timeEnd("Solve");
console.log(result);
