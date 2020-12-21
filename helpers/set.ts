export function intersection(set1: Set<string>, set2: Set<string>) {
  return new Set([...set1].filter((v) => set2.has(v)));
}
