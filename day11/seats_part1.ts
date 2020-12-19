import { textSpanContainsTextSpan } from "typescript";
{
  const seatStrings = [
    "LLLLL.LLLLLLLL..LLLLLLLLLLLLLL.LLLL..LL..LLLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLL.L.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.L.LLLLLL",
    "LL.LLLLLLLLL.L.LLLLLL.LLLLLLLL.LLLL.LLLL.LLLLLLLL.LL.L.LLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLL.L.LLLLLLLL.LLLL.LLLLLLLLL..LLLL.LLLLLL.LLL.LLLL.LLL",
    "....L...............L...L...L.....L..L.LLLL..L.L...L...L.L.L..L.....LL..LL........L.LLLL..",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLL.LL.LLLL.LLLL.LL.L.LLL.LLLLLLLLLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLL.L.LLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLL.L.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLL.LLLLLL.LLL.LLLLLLLLL.L.LLLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLL..LLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLL.LLLL.LL.LLLLL.LLLL.LLLLLLLLL.LLLLLLLLL.LLLLLLLLLL.LLLL",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL",
    "L..L..L.LLL...L.L.....L....L.LL..........L.L....LLL...L...L.LLL.L...L...L......L..L..L....",
    "LL.L.L..LLLL.LLLLLLLLLLLLLLLLL.LLLL..LLL.LLLLLLLL.LLLL.LLLLLLLLLL.LLLLLL.L.LLLLLLLLLLLLLLL",
    "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLL..LLLLLLLLLLLLLLLL.LLLLLL.LLL.LLL.L.LLLLLL.LLLLLLLL",
    "LLLLLLLLL.LLLLLLLLLLLLLL.LLLL..LLLLLLLLL.LLLLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LL.LLLLLL.LLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL.LL.LLLLL",
    "LLL.L.LLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLL.LLLL.LL.LLLL.L.LLLL.LLL.LLLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL",
    ".LLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLL.LLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLL.L",
    "LL....LL.L.L....L...........L........L...L.L.L.L.L.L.L...LLLL....L......L..LL.L...L...L..L",
    "LLLLL.LLLLLLLL.LLLLLL.L.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LL.LLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL",
    "LL.LL.LLLLLLLL.LLLLLL...LLLLLL.LLLL.LLLL.LLLLLLLL.LL.L.LLLLLLLLLLLLLLLLLLL.LLLLL..LLLLLLLL",
    "LLLLL.LLL.LLLL.LL.LLLLLLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLL..LLL.LLL.LLLLLL",
    "LLLL.LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLL.L.LLLLLLLL",
    "LLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLLLLLL.LL.L.LLLLLL",
    ".LLLLL..L.LL....L..LL.LLL.L.....LLL.LL..........L..L..LL..L..L.L..L.L.L..L.L...........L.L",
    "LLLLL.LLLLLLLL.LLLLLLLL.LLLLLL.LLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL.LLLL.LLL",
    "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLL..LLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLL",
    "LLL.L.LLLLLLLL.LLLLLLLLLLLLL.L.LLLL.LLLLLLLLLLLLL.LLLL.L.LLLLLLLLLLLLLLLLL.LL.LLL.LLLLLLLL",
    "LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLL.LLLL..LLLLLLLL.LLLLLLLLL.LLLLLL.LLLLL.LL",
    "LLLLLLLLL.LLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLL.L.LLLLLLL.LLLLLLLLLL.LLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLL.LLLLLL.LLLL.LLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLL.LLLL.LLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLLLL",
    "LLL.LLLLL....L..L..L....L.L..L....L..LL..L.........L......L..L....LL...L.L...LLLLL.....L.L",
    ".LLLL.LLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLL.LLLLLLLL.LL.L.LLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL",
    "LLL.LLLLLLLLL.LLLLLLLLLLLLLLLL.LLLL.LLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLL..LLLLLLLL.LLLL.LLLLLLL.L.LLLLLLLLL.LLLL.L.LLL.LLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLL.L.LLLLLLLL.LLLLLLL..LLLLLLL",
    "....L...LL....L..L..L.L......LLL........L.LL..L.L...L...L..L....LLL..LL.LLL.LLL.L..L....L.",
    "LLLLLLLLLLLLLL.LLLLLL.LLLLLLL..LLLL.LLLL..LLLLLLLLLL.LLLLLLLLLLL..LLLLLL.LLLLLLLL.LLLLLLLL",
    "LLLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLL.LLLL.LLLL.LLLL.LL.LLLL.L.LLL.LL.LLLL.LLL",
    "LLLLL.LL.LLLLL.LLLL.L.LLLLLLLL.LLLL.L.LLLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLL.LLLL..LLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL",
    "L.LLL.LLLLLLLL.LL.LLLLLLLLLLLL.LLLL.LLLL.LL.L.LLL.LLLL.LLLLLLLL..LLLLLLLLL.LLLLLL.LLLLLLLL",
    "...LLLL..L...LLLL..LL...L.......L..LLL....L..........LL.L...LL.L.....L.....LL..L......LLLL",
    "L.LLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLLLL.LL.LLLLLLLLLLLLLLLLLLLL.LLLLL.LLLL.LLLLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLL..LLLLLLL.L.LL.LLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLL",
    "LLLLL.LLLLLLL..LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLL.L.L...LLLLLLLLLLLLLLLLLLLLLLLLLLLLL",
    "LLLLLLL.LLLLL..LLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL",
    "....LLL.L.......LL.....LL..L...LL.LLL......L..L..LL..LL.LL.L..L.LL.....L.L.L.L.....L..L...",
    "LLL.L.LLLLLLLL.LL.LLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLL.LLL..LLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LL.LLLLL.LLLLLL.LLLLLLLLLL.LL.LLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL..LLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLL.LL",
    "LLLLL.LLLLLLLL.LLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLL.LLLLLL.LL.LLLLL.LLLLLLLLL.LLLLLLLL.LLLL.LLLLLLLL..LLLLLLLL..LL.LLL.LLLLLLLL",
    "LLL..L.L.L..........LL....L...L.L.LLL.L.L..L.....L...L.LLL............L.L.L..L..........L.",
    "LLLLL.LLLLL..L.LLLLLL.LLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLLL.LL.LLLLLLLLLLLLLLLLLLLLLL",
    "L.LLL.LLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLL.L.LLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLL.L.LLLLLLLL",
    "LLLL..LLLLLLLLLLLLLLLLLLLLL.LL.LLLL.LLLL.LLLLLLLL.LLLLLLLLLLLLLLLL.LLLL.LL.LLLLLLLLLLLLLLL",
    "LLLL..LLLLLLLL.LLLLLL.LLLLLLLL.LLL.L.LLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLL.LLL",
    ".LLLL.LLL.LLLLLLLLLLL.LLLL.LLL..LLLLLLLL.LLLLLLLLLLLLL.LL.LLLLLLLLLLLLLLLLLLLLL.L.LLLLLLLL",
    "LL.LL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLL.LLLLL.LL.LLLLL",
    "LLLLL.LLLLLLLL.LLL.LL..LLLLLLL.LLLL.LLLL.LLLLLLLL.LLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLLLL",
    "...L.L.........L............L...LLL.L.L.L....L..LL.LL...........L.LL.L.....LL.L.L..L..L...",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LL.L.LLLLLLLL.LLLLLLLLL.L.LLLLLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLLLLLLLLL..LLLLLLLLLL.LLLLL.LLLL.LLLL.LLLLLLLL.LLLL.LL.LLLLLLLLLLLLLLLL.LLLLLL.LLL.LLLL",
    "LLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.L.LL.LLLL.LLLLLLLLLLLLLLLLLLLLLLL..LLLLLLLL.LLLLLLLLLLLLLLL",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLL.LL..LLLL.LLLLLLLLLLLLLL.LLLLLLLLL.LLLLLL.L.LLLL.L",
    "LLLLLLLLLL.LLL.LLLLLL.L.LLLLLL.LLLL.LLLL.LLL.LLLL.LLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLL.LL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLL.LLL.LLLLLLLLLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLLL.L.LLLLLLL.LLLLLL.LLLLLLLL",
    "L.LLLLLLLLLLLL.LLLLLL.LLLLLL.L.LLLLLLLLL.LL.LLLLL.LLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLLL",
    ".......L.LL.LLL.L.L.....LL.LL.L....L...LL...L......L..L.L..L...L.....L.LL.L.L.LL.L.L......",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL.LLL.LLLL",
    "LLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLL.LLL.LLLLL.L.LLLLLLL..LL.L.LLLLLLLLL",
    "LLLLL.L.LLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLL.LLL.LLLLLLLLL.LLLLLLLLLLL.LLL",
    "LLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLL...LLL.LL.LLLLL.LLLL.LLLLLLLLL..LLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLL.LLLLLL.LLL.LLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLL..LLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLL..LLL..LLL.LLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LL.LLLLLLLLLLLLLLL.LLLLLLLL..LLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL",
    "...LL.L..L............LL.LL.....L.L.L..LLLL.L....L.L...L..LL.....LL.LL.L.L..LL..L..LL.L.L.",
    "LLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLL.LLLL.L.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL",
    "LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LL.L.LLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL",
    "LLLLLLL.LL.LLL.LLLLLLLLLLLLLLL.LLLL..LLL.LLLLLLLLLLLLLLLLLLLLLLL..LLLLLLLLLLL.LLLLLLLLLLLL",
    "LLLLLLLLLLLLLLLLLLL.L.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLL",
    "LLLLL..LLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LL.L..LLLLL.LLLLLLLL",
    "LLLLLLLLLLLLLLL.LLLLL.LLLLLLLL..LLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLL",
    "LLL.L.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.L.L.LLL.LLLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLL...LLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
    ".LLLL.LLLLLLLLLLLLLL..LLLLLLL.LLLLL.LLLL.LLLLLLLLLL.LL.LLLLLLLLLLLLLLLLLLL.LLLL...LLLLLLLL",
    "LLLLLLLLLLLLLLLLLLLL..LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL..LLLLL..LLLLLLL",
    "LLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLL.LL.LL.L.LLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLL",
    "LL.LL.LLLLLLLL.LLLLLL.LLLLLLLL.LLLL.L.LL.LLLLLLLL.LLLL.LLLLLLL...LLLLLLLLL.LLLLLL.LL.LLLLL",
    "LLLLL.LLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLL.LLLLLL..L.LLLLLL.LLLLLLLL",
    "LLLLL.LLLLLLLL.LLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLLLL.LLL..LLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL",
  ];

  const exmaple = [
    "L.LL.LL.LL",
    "LLLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLLL",
    "L.LLLLLL.L",
    "L.LLLLL.LL",
  ];

  // padd the seats with '.' to make avoid having to do bounds checks
  const seats = seatStrings.map((str) => [".", ...str.split(""), "."]);
  seats.push(new Array(seats[0].length).fill("."));
  seats.unshift(new Array(seats[0].length).fill("."));

  function countOccupied(x: number, y: number, seats: Array<string[]>) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx == 0 && dy == 0) {
          continue;
        }
        let posX = x + dx;
        let posY = y + dy;
        if (seats[posY][posX] === "#") {
          count++;
        }
      }
    }
    return count;
  }

  function copySeats(src: Array<string[]>) {
    return src.map((str) => [...str]);
  }

  function runStep(src: Array<string[]>) {
    //   console.log(src);
    const newSeats = copySeats(src);
    let count = 0;
    for (let y = 1; y < seats.length - 1; y++) {
      for (let x = 1; x < seats[0].length - 1; x++) {
        const occ = countOccupied(x, y, src);
        if (src[y][x] === "L" && occ === 0) {
          newSeats[y][x] = "#";
          count++;
        }
        if (src[y][x] === "#" && occ >= 4) {
          newSeats[y][x] = "L";
          count++;
        }
      }
    }
    //   console.log(newSeats);
    //   console.log(count);
    return { newSeats, count };
  }

  function countSeats(seats: Array<string[]>) {
    return seats.reduce(
      (total, row) => row.filter((s) => s === "#").length + total,
      0
    );
  }

  function countChanges(seats: Array<string[]>) {
    let steps = 0;
    let updated = seats;
    while (true) {
      const { newSeats, count } = runStep(updated);
      updated = newSeats;
      if (count === 0) {
        return countSeats(updated);
      }
      steps++;
    }
  }

  console.log("Starting");
  console.time("Part1");
  const result = countChanges(seats);
  console.timeEnd("Part1");
  console.log(result);
}
