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

const input = fs.readFileSync(__dirname + "../day6/input.txt", {
  encoding: "utf-8",
});

const groupsAnswers: GroupAnswers[] = input.split("\n\n").map((data) => {
  const members = data.split("\n").map((row) => new Set(row.split("")));
  return {
    union: members.reduce(
      (previous, current) => union(previous, current),
      new Set<string>()
    ),
    intersection: members.reduce(
      // for the first row just use the set, otherwise intersect with the previous
      (previous, current) => intersection(previous, current),
      members[0]
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
