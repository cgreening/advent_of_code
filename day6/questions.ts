import fs from "fs";

function intersection(set1: Set<string>, set2: Set<string>) {
  return new Set([...set1].filter((v) => set2.has(v)));
}

function union(set1: Set<string>, set2: Set<string>) {
  return new Set([...set1, ...set2]);
}

type GroupAnswers = {
  union: Set<string>;
  intersection: Set<string> | null;
};

const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });

const answers: GroupAnswers[] = input.split("\n\n").map((data) => {
  const invidualsAnserts = data
    .split("\n")
    .map((row) => new Set(row.split("")));
  return {
    union: invidualsAnserts.reduce(
      (u, invidual) => union(u, invidual),
      new Set<string>()
    ),
    intersection: invidualsAnserts.reduce(
      (u, invidual) => (u ? intersection(u, invidual) : invidual),
      null as Set<string> | null // initial value is null
    ),
  };
});

const sum1 = answers
  .map((ans) => ans.union.size)
  .reduce((c, total) => total + c, 0);
console.log(sum1);

const sum2 = answers
  .map((ans) => (ans.intersection || new Set()).size)
  .reduce((c, total) => total + c, 0);

console.log(sum2);
