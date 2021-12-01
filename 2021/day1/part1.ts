import fs from "fs";

const raw = fs.readFileSync(__dirname + "/depths.txt", {
  encoding: "utf-8",
});

const depths = raw.split("\n").map((line: string) => parseInt(line));

let last_depth = depths[0];
let total_increased = 0;
for (let i = 0; i < depths.length; i++) {
  const depth = depths[i];
  if (depth > last_depth) {
    total_increased++;
  }
  last_depth = depth;
}

console.log(total_increased);
