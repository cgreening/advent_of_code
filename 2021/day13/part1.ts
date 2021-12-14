import fs from "fs";

function parseData(filename: string) {
  const lines = fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .filter((line) => line.length > 0);

  // get the fold instructions
  const foldInstructions = lines.filter((line) => line.startsWith("fold"));

  const folds = foldInstructions.map((line) => {
    const [axis, position] = line.split("=");
    return {
      axis: axis.includes("x") ? "x" : "y",
      position: parseInt(position, 10),
    };
  });
  // and the points
  const pointInstructions = lines.filter((line) => !line.startsWith("fold"));

  const points = pointInstructions.map((line) => {
    const [x, y] = line.split(",");
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
  });

  return { folds, points };
}

function dumpPointSet(pointsSet: Set<string>) {
  // work out the bounds of the points
  const minX = Math.min(
    ...[...pointsSet].map((point) => parseInt(point.split(",")[0], 10))
  );
  const minY = Math.min(
    ...[...pointsSet].map((point) => parseInt(point.split(",")[1], 10))
  );
  const maxX = Math.max(
    ...[...pointsSet].map((point) => parseInt(point.split(",")[0], 10))
  );
  const maxY = Math.max(
    ...[...pointsSet].map((point) => parseInt(point.split(",")[1], 10))
  );

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const map = new Array(height + 1)
    .fill(0)
    .map(() => new Array(width + 1).fill("."));
  const points = [...pointsSet];
  points.forEach((point) => {
    const [xStr, yStr] = point.split(",");
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);
    map[y + minY][x + minX] = "#";
  });
  console.log(map.map((row) => row.join("")).join("\n"));
}

function part1(filename: string) {
  const { folds, points } = parseData(filename);
  // find the max of x
  const maxX = Math.max(...points.map((point) => point.x));
  // find the max of y
  const maxY = Math.max(...points.map((point) => point.y));
  // console.log(maxX, maxY);

  // use a set to hold the points
  let pointsSet = new Set<string>();
  points.forEach((point) => pointsSet.add(`${point.x},${point.y}`));
  // dumpPointSet(pointsSet);
  // now do the folding
  for (let fold of folds) {
    const axis = fold.axis;
    const position = fold.position;
    // run through each point - if it is to the right of the fold, mirror it to the left
    let newPointsSet = new Set<string>();
    [...pointsSet].forEach((key) => {
      const [xStr, yStr] = key.split(",");
      const x = parseInt(xStr, 10);
      const y = parseInt(yStr, 10);
      if (axis === "x") {
        if (x > position) {
          newPointsSet.add(`${position - (x - position)},${y}`);
        } else {
          newPointsSet.add(`${x},${y}`);
        }
      }
      if (axis === "y") {
        if (y > position) {
          newPointsSet.add(`${x},${position - (y - position)}`);
        } else {
          newPointsSet.add(`${x},${y}`);
        }
      }
    });
    pointsSet = newPointsSet;
  }
  dumpPointSet(pointsSet);
  console.log(pointsSet.size);
}

part1("./2021/day13/input.txt");
