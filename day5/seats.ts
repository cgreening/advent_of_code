import numbers from "./seat_numbers";

/*
BFFFBBFRRR: row 70, column 7, seat ID 567.
FFFBBBFRRR: row 14, column 7, seat ID 119.
BBFFBBFRLL: row 102, column 4, seat ID 820.
*/

function binarySearch(bd: string, up: string, max: number) {
  let min = 0;
  // first 7 characters
  const rowChars = bd.split("");
  for (const c of rowChars) {
    const half = Math.floor((min + max) / 2);
    if (c === up) {
      min = half;
    } else {
      max = half;
    }
  }
  return max;
}

function getRow(bd: string) {
  return binarySearch(bd.slice(0, 7), "B", 127);
}

function getColumn(bd: string) {
  return binarySearch(bd.slice(7, 10), "R", 7);
}

function getSeat(bd: string) {
  const row = getRow(bd);
  const col = getColumn(bd);
  return row * 8 + col;
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
