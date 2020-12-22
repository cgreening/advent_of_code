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

  const { player1: hand1, player2: hand2 } = parse();

  console.time("Part2");

  const recursiveGame = (player1: number[], player2: number[]) => {
    const gameCache = new Set<string>();
    // play the game
    while (player1.length > 0 && player2.length > 0) {
      // have we seen this game before?
      const handKey = player1.join(",") + ":" + player2.join(",");
      if (gameCache.has(handKey)) {
        // trigger player 1 win - this seems to work though it's not clear from the instruction what should be in player 1's hand when he wins
        return { player1, player2: [] };
      }
      gameCache.add(handKey);
      const top1 = player1.shift()!;
      const top2 = player2.shift()!;
      // default rules
      let player1Wins = top1 > top2;
      // check for recursive game
      if (top1 <= player1.length && top2 <= player2.length) {
        const { player1: subPlayer1 } = recursiveGame(
          player1.slice(0, top1),
          player2.slice(0, top2)
        );
        player1Wins = subPlayer1.length > 0;
      }
      if (player1Wins) {
        player1.push(top1);
        player1.push(top2);
      } else {
        player2.push(top2);
        player2.push(top1);
      }
    }
    return { player1, player2 };
  };

  const { player1: resultPlayer1, player2: resultPlayer2 } = recursiveGame(
    hand1,
    hand2
  );
  const winningHand = resultPlayer1.length == 0 ? resultPlayer2 : resultPlayer1;
  const part2 = winningHand
    .reverse()
    .reduce((totalScore, card, index) => totalScore + card * (index + 1), 0);

  console.timeEnd("Part2");
  console.log(winningHand);
  console.log("Part2", part2);
}

day22("/input.txt");
