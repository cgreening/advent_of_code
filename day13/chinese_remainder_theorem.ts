// taken from here: https://www.geeksforgeeks.org/chinese-remainder-theorem-set-1-introduction/#:~:text=Chinese%20Remainder%20Theorem%20states%20that,x%20that%20satisfies%20given%20congruences.&text=rem%5Bk%2D1%5D%2C,following%20system%20of%20simultaneous%20congruences.
// and here: https://www.geeksforgeeks.org/chinese-remainder-theorem-set-2-implementation/

import { runInNewContext } from "vm";

function mod(a: number, b: number): number {
  const result = a % b;
  if (result < 0) return result + b;
  return result;
}

// returns x where (a * x) % b == 1
function mul_inv(a: number, b: number): number {
  let b0 = b;
  let x0 = 0;
  let x1 = 1;
  if (b == 1) {
    return 1;
  }
  while (a > 1) {
    let q = Math.floor(a / b);
    const tmp1 = mod(a, b);
    a = b;
    b = tmp1;
    const tmp2 = x1 - q * x0;
    x1 = x0;
    x0 = tmp2;
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}

function solve(input: string) {
  const modAndRemainder = input
    .split(",")
    .map((num, rem) => ({
      num,
      rem,
    }))
    .filter((stringVersion) => stringVersion.num !== "x")
    .map((stringVersion) => ({
      num: parseInt(stringVersion.num, 10),
      rem: parseInt(stringVersion.num, 10) - stringVersion.rem,
    }));
  console.log(modAndRemainder);

  let p;
  let prod = 1;
  let sum = 0;

  for (let i = 0; i < modAndRemainder.length; i++) {
    prod *= modAndRemainder[i].num;
  }

  for (let i = 0; i < modAndRemainder.length; i++) {
    p = Math.floor(prod / modAndRemainder[i].num);
    sum += modAndRemainder[i].rem * mul_inv(p, modAndRemainder[i].num) * p;
  }

  console.log(sum, prod);
  return mod(sum, prod);
}

console.log(
  //   solve(
  //     "23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,733,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37"
  //   )
  solve("17,x,13,19")
);
