import fs from "fs";

function part2() {
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
  let aim = 0;
  for (const instruction of instuctions) {
    switch (instruction.direction) {
      case "up":
        aim -= instruction.distance;
        break;
      case "down":
        aim += instruction.distance;
        break;
      case "forward":
        horizontal += instruction.distance;
        depth += aim * instruction.distance;
        break;
    }
  }
  console.log(horizontal * depth);
}

part2();
