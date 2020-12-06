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

const groupsAnswers: GroupAnswers[] = input.split("\n\n").map((data) => {
  const groupAnswers = data.split("\n").map((row) => new Set(row.split("")));
  return {
    union: groupAnswers.reduce(
      (previous, current) => union(previous, current),
      new Set<string>()
    ),
    intersection: groupAnswers.reduce(
      // for the first row just use the set, otherwise intersect with the previous
      (previous, current) =>
        previous ? intersection(previous, current) : current,
      null as Set<string> | null
    ),
  };
});

const sum1 = groupsAnswers
  .map((ans) => ans.union.size)
  .reduce((c, total) => total + c, 0);

console.log(sum1);

const sum2 = groupsAnswers
  .map((ans) => (ans.intersection || new Set()).size)
  .reduce((c, total) => total + c, 0);

console.log(sum2);
