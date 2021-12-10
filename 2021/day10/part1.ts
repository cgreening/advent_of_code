import fs from "fs";

function parseInput(file: string) {
  const lines = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((line) => line.length > 0);
  return lines;
}

function getInvalidChar(line: string) {
  const chars = line.split("");
  const currentBracket: string[] = [];
  const openingBrackets = new Set("([{<".split(""));
  const closingBrackets = new Set(")]}>".split(""));
  const openToClose: { [key: string]: string } = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };
  for (const char of chars) {
    if (openingBrackets.has(char)) {
      currentBracket.push(openToClose[char]);
    } else if (closingBrackets.has(char)) {
      const lastBracket = currentBracket.pop();
      if (lastBracket !== char) {
        return char;
      }
    }
  }
  return "X";
}

function getMisingChars(line: string) {
  const chars = line.split("");
  const currentBracket: string[] = [];
  const openingBrackets = new Set("([{<".split(""));
  const closingBrackets = new Set(")]}>".split(""));
  const openToClose: { [key: string]: string } = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };
  for (const char of chars) {
    if (openingBrackets.has(char)) {
      currentBracket.push(openToClose[char]);
    } else if (closingBrackets.has(char)) {
      const lastBracket = currentBracket.pop();
      if (lastBracket !== char) {
        throw new Error("Mismatched brackets");
      }
    }
  }
  return currentBracket;
}

function part1(filename: string) {
  const lines = parseInput(filename);
  const invalidChars = lines.map((line) => getInvalidChar(line));
  const scores: { [key: string]: number } = {
    X: 0,
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  const score = invalidChars.reduce((acc, char) => acc + scores[char], 0);
  console.log(score);
}

function part2(filename: string) {
  const lines = parseInput(filename);
  const incompleteLines = lines.filter((line) => getInvalidChar(line) === "X");
  const closingBrackets = incompleteLines.map((line) => getMisingChars(line));
  const scores: { [key: string]: number } = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  // console.log(closingBrackets.map((l) => l.join("")).join("\n"));
  const lineScores = closingBrackets.map((brackets) =>
    brackets.reverse().reduce((acc, bracket) => 5 * acc + scores[bracket], 0)
  );
  const score = lineScores.sort((a, b) => b - a)[
    Math.floor(lineScores.length / 2)
  ];
  console.log(score);
}

// part1("./2021/day10/input.txt");
part2("./2021/day10/input.txt");
