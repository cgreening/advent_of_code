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

function solve(adaptors: number[]) {
  // work out the final value we want
  const dest = adaptors.reduce((max, current) => Math.max(max, current)) + 3;
  // add it to the list of adaptors
  adaptors.push(dest);
  // find a path from 0 jolts to the destination
  const available = new Set(adaptors);
  let currentJolts = 0;
  let difference1 = 0;
  let difference3 = 0;
  while (currentJolts != dest) {
    if (available.has(currentJolts + 1)) {
      currentJolts += 1;
      difference1++;
    } else if (available.has(currentJolts + 2)) {
      currentJolts += 2;
    } else if (available.has(currentJolts + 3)) {
      currentJolts += 3;
      difference3++;
    }
  }
  return difference1 * difference3;
}
console.time("Solve");
const result = solve(input);
console.timeEnd("Solve");
console.log(result);
