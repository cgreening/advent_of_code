import input from "./input";

class Board {
  rows: Array<Set<number>>;
  columns: Array<Set<number>> = [];
  board: Array<Array<number>>;
  numbers: Set<number>;
  constructor(board: Array<Array<number>>) {
    this.board = board;
    this.rows = board.map((row) => new Set(row));
    for (let c = 0; c < board[0].length; c++) {
      this.columns.push(new Set(board.map((row) => row[c])));
    }
    this.numbers = new Set(board.flat());
  }
  apply_number(number: number) {
    this.numbers.delete(number);
    this.rows.forEach((row) => row.delete(number));
    this.columns.forEach((column) => column.delete(number));
    // check to see if any row or column is empty
    return (
      this.rows.some((row) => row.size === 0) ||
      this.columns.some((column) => column.size === 0)
    );
  }
  canplay() {
    return !(
      this.rows.some((row) => row.size === 0) ||
      this.columns.some((column) => column.size === 0)
    );
  }
  sum() {
    return [...this.numbers].reduce((acc, curr) => acc + curr, 0);
  }
}

function part1() {
  const { numbers, boards } = input();
  const boardObjects = boards.map((board) => new Board(board));
  let lastResult = 0;
  for (let number of numbers) {
    for (let board of boardObjects) {
      if (board.canplay()) {
        if (board.apply_number(number)) {
          // board has succeeded
          const sum = board.sum();
          lastResult = sum * number;
        }
      }
    }
  }
  console.log(lastResult);
}

part1();
