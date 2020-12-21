/**
 * Take as input a map of string to set of strings and tries to get everything down to one entry
 */
import Heap from "heap";

export default function singleEntryReduction<KEY, VALUE>(
  rows: Array<{ key: KEY; values: Set<VALUE> }>
): Map<KEY, VALUE> {
  // use a min heap to make it easier to pop off the ingredient with the smallest number of alergens
  const heapSorter = (
    a: { key: KEY; values: Set<VALUE> },
    b: { key: KEY; values: Set<VALUE> }
  ) => a.values.size - b.values.size;
  // do the reductio
  Heap.heapify(rows, heapSorter);
  const result = new Map<KEY, VALUE>();
  while (rows.length) {
    const smallest = Heap.pop(rows, heapSorter);
    if (smallest.values.size !== 1) {
      throw new Error("Should only have one alergen");
    }
    // update the result
    const field = [...smallest.values][0];
    result.set(smallest.key, field);
    // remove this field from everything else
    rows.forEach((entry) => entry.values.delete(field));
    // update the heap - this is a bit inefficient really - should just update the items that had the field...
    Heap.heapify(rows, heapSorter);
  }
  return result;
}
