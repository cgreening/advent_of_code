import numbers from "./seat_numbers";
{
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
}
