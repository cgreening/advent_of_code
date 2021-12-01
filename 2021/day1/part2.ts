import fs from "fs";

const raw = fs.readFileSync(__dirname + "/depths.txt", {
  encoding: "utf-8",
});

const depths = raw.split("\n").map((line: string) => parseInt(line));

let sliding_window = depths[0] + depths[1] + depths[2];
let last_sliding_window = 0;
let total_increased = 0;
for (let i = 3; i < depths.length; i++) {
  sliding_window -= depths[i - 3];
  sliding_window += depths[i];
  if (sliding_window > last_sliding_window) {
    total_increased++;
  }
  last_sliding_window = sliding_window;
}

console.log(total_increased);
