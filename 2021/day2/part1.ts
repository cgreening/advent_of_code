import fs from "fs";

function part1() {
  const raw = fs.readFileSync(__dirname + "/instructions.txt", {
    encoding: "utf-8",
  });

  const instuctions = raw.split("\n").map((line: string) => {
    const [direction, distance] = line.split(" ");
    return {
      direction,
      distance: parseInt(distance, 10),
    };
  });

  let depth = 0;
  let horizontal = 0;
  for (const instruction of instuctions) {
    switch (instruction.direction) {
      case "up":
        depth -= instruction.distance;
        break;
      case "down":
        depth += instruction.distance;
        break;
      case "forward":
        horizontal += instruction.distance;
        break;
    }
  }
  console.log(horizontal * depth);
}

part1();
