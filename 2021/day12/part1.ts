import fs from "fs";
import { format } from "path";

class Cave {
  public isSmall: boolean;
  public name: string;
  public links: Cave[] = [];
  constructor(name: string) {
    this.isSmall = name.toLowerCase() === name;
    this.name = name;
  }
  public describe() {
    return (
      (this.isSmall ? "small: " : "big: ") +
      this.links.map((link) => this.name + "->" + link.name).join(", ")
    );
  }
}

function parseInput(filename: string) {
  const caves = new Map<string, Cave>();
  const lines = fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .filter((line) => line.length > 0);
  lines.forEach((line) => {
    const [cave1Name, cave2Name] = line.split("-");
    const cave1 = caves.get(cave1Name) || new Cave(cave1Name);
    const cave2 = caves.get(cave2Name) || new Cave(cave2Name);
    caves.set(cave1Name, cave1);
    caves.set(cave2Name, cave2);
    cave1.links.push(cave2);
    cave2.links.push(cave1);
  });
  return caves;
}

function dfs(
  cave: Cave,
  currentPath: string[],
  canVisit: (path: string[], cave: Cave) => boolean
) {
  if (cave.name === "end") {
    return 1;
  }
  // already been to the small cave
  if (canVisit(currentPath, cave)) {
    let routes = 0;
    for (const link of cave.links) {
      routes += dfs(link, [...currentPath, cave.name], canVisit);
    }
    return routes;
  } else {
    return 0;
  }
}

function part1(filename: string) {
  const caves = parseInput(filename);
  const result = dfs(
    caves.get("start")!,
    [],
    (path: string[], cave: Cave) => !cave.isSmall || !path.includes(cave.name)
  );
  console.log(result);
}

function part2(filename: string) {
  const caves = parseInput(filename);
  const result = dfs(caves.get("start")!, [], (path: string[], cave: Cave) => {
    // can vist the large caves as often as we want
    if (!cave.isSmall) {
      return true;
    }
    // can only visit start and end once
    if (cave.name == "start" || cave.name == "end") {
      return !path.includes(cave.name);
    }
    // haven't visited the cave yet
    if (!path.includes(cave.name)) {
      return true;
    }
    // can only visit one cave twice
    const counts: { [key: string]: number } = {};
    for (let p of path) {
      if (p.toLowerCase() === p) {
        counts[p] = (counts[p] || 0) + 1;
        if (counts[p] === 2) {
          return false;
        }
      }
    }
    return true;
  });
  console.log(result);
}

part1("./2021/day12/input.txt");
part2("./2021/day12/input.txt");
