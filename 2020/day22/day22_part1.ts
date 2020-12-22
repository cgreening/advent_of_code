import fs from "fs";

function day22(inputfile: string) {
  const parse = () => {
    const parsePlayerCards = (lines: string[]) =>
      lines.slice(1).map((line) => parseInt(line, 10));

    const [player1, player2] = fs
      .readFileSync(__dirname + inputfile, {
        encoding: "utf-8",
      })
      .split("\n\n")
      .map((player) => parsePlayerCards(player.split("\n")));

    return { player1, player2 };
  };

  const { player1, player2 } = parse();

  while (player1.length > 0 && player2.length > 0) {
    const top1 = player1.shift()!;
    const top2 = player2.shift()!;
    if (top1 > top2) {
      player1.push(top1);
      player1.push(top2);
    } else {
      player2.push(top2);
      player2.push(top1);
    }
  }
  const winningHand = player1.length == 0 ? player2 : player1;
  console.log(winningHand);
  const part1 = winningHand
    .reverse()
    .reduce((totalScore, card, index) => totalScore + card * (index + 1), 0);

  console.log("Part1", part1);
}

day22("/input.txt");
