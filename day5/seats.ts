import numbers from "./seat_numbers";

/*
BFFFBBFRRR: row 70, column 7, seat ID 567.
FFFBBBFRRR: row 14, column 7, seat ID 119.
BBFFBBFRLL: row 102, column 4, seat ID 820.
*/

function getSeat(bd: string) {
  return parseInt(bd.replace(/[B|R]/g, "1").replace(/[F|L]/g, "0"), 2);
}

const seats = numbers.map(getSeat);
const max = seats.reduce((seat, max) => Math.max(seat, max), 0);

console.log(max);

// console.log(getSeat("BFFFBBFRRR"));
// console.log(getSeat("FFFBBBFRRR"));
// console.log(getSeat("BBFFBBFRLL"));

for (let mySeat = 0; mySeat < 127 * 8 + 8; mySeat++) {
  if (
    !seats.includes(mySeat) &&
    seats.includes(mySeat - 1) &&
    seats.includes(mySeat + 1)
  ) {
    console.log(mySeat);
  }
}

///////// dave

const fs = require("fs");
// read data file to array

const text = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .filter((x) => x);

// replace FBLR with 1 and 0 and convert binary string to decimal

const seatCodes = text.map((pass) =>
  parseInt(pass.replace(/[BR]/gi, "1").replace(/[FL]/gi, "0"), 2)
);
// console.log(text);

console.log(Math.max(...seatCodes));

console.log("part 2:");
const sorted = seatCodes.sort((a, b) => a - b);

for (let i = 0; i < sorted.length - 2; i++) {
  if (sorted[i + 1] - sorted[i] !== 1) {
    console.log(`Seat: ${sorted[i] + 1}`);
  }
}
