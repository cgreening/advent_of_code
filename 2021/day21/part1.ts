import fs from "fs";

const input = fs.readFileSync("./2021/day21/input.txt", "utf8").split("\n");

const playerInitialPos: number[] = [];
const finalScore = 21;
const board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

input.forEach((userInfo) => {
  const startingPos = Number(userInfo.split("position: ")[1]);
  playerInitialPos.push(startingPos);
});

const memo: { [key: string]: any } = {};

const wins = (
  player1Score: number,
  player1Pos: number,
  player2Score: number,
  player2Pos: number,
  playerOneGoes: boolean
) => {
  const key = `${player1Score},${player1Pos},${player2Score},${player2Pos},${playerOneGoes}`;
  if (memo[key] !== undefined) return memo[key];
  if (player1Score >= finalScore) {
    memo[key] = [1, 0];
    return [1, 0];
  }
  if (player2Score >= finalScore) {
    memo[key] = [0, 1];
    return [0, 1];
  }
  let totalWins = [0, 0];

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
        if (!playerOneGoes) {
          const newPos = board[(player2Pos + i + j + k - 1) % 10];
          const currWin = wins(
            player1Score,
            player1Pos,
            player2Score + newPos,
            newPos,
            !playerOneGoes
          );
          totalWins = [totalWins[0] + currWin[0], totalWins[1] + currWin[1]];
        } else {
          const newPos = board[(player1Pos + i + j + k - 1) % 10];
          const currWin = wins(
            player1Score + newPos,
            newPos,
            player2Score,
            player2Pos,
            !playerOneGoes
          );
          totalWins = [totalWins[0] + currWin[0], totalWins[1] + currWin[1]];
        }
      }
    }
  }

  memo[key] = totalWins;
  return totalWins;
};

const winnings = wins(0, playerInitialPos[0], 0, playerInitialPos[1], true);

console.log(Math.max(...winnings));
