import Heap from "heap";
import { isConstructorTypeNode } from "typescript";
import {
  day16NearbyTickets,
  day16MyTicket,
  day16Rules,
  TicketRule,
} from "./data";
function day16Part1(
  myTicket: number[],
  rules: TicketRule[],
  nearbyTickets: number[][]
) {
  // is the value valid for the rule
  const isValid = (rule: TicketRule, value: number) =>
    (value >= rule.start1 && value <= rule.end1) ||
    (value >= rule.start2 && value <= rule.end2);
  // is the ticket valid
  const isValidTicket = (rules: TicketRule[], ticket: number[]) =>
    ticket.every((value) => rules.some((rule) => isValid(rule, value)));
  // is this field index valid for the rule
  const isFieldValidForRule = (
    rule: TicketRule,
    field: number,
    tickets: number[][]
  ) =>
    tickets
      .map((ticket) => ticket[field])
      .every((value) => isValid(rule, value));

  // these are the valid tickets
  const validTickets = nearbyTickets.filter((ticket) =>
    isValidTicket(rules, ticket)
  );

  // for each rule work out which field indexes are valid
  type RuleToFieldIndexes = {
    rule: TicketRule;
    fieldIndexes: Set<number>;
  };
  const rulesToFieldIndexes: Array<RuleToFieldIndexes> = rules.map((rule) => {
    const validFields = new Set<number>();
    for (let field = 0; field < rules.length; field++) {
      if (isFieldValidForRule(rule, field, validTickets)) {
        validFields.add(field);
      }
    }
    return { rule, fieldIndexes: validFields };
  });
  // add to a min heap - types are wrong so force to correct type
  const heapSorter = (a: RuleToFieldIndexes, b: RuleToFieldIndexes) =>
    a.fieldIndexes.size - b.fieldIndexes.size;
  Heap.heapify<RuleToFieldIndexes>(rulesToFieldIndexes, heapSorter);
  const result: { [key: string]: number } = {};
  while (rulesToFieldIndexes.length) {
    const smallest = Heap.pop(rulesToFieldIndexes, heapSorter);
    if (smallest.fieldIndexes.size !== 1) {
      throw new Error("Should only have one valid field");
    }
    // update the result
    const field = [...smallest.fieldIndexes][0];
    result[smallest.rule.name] = field;
    // remove this field from everything else
    rulesToFieldIndexes.forEach((entry) => entry.fieldIndexes.delete(field));
    // update the heap - this is a bit inefficient really - should just update the items that had the field...
    Heap.heapify(rulesToFieldIndexes, heapSorter);
  }
  return Object.keys(result)
    .filter((rule) => rule.startsWith("departure"))
    .reduce((product, rule) => (product *= myTicket[result[rule]]), 1);
}

const exampleRules = [
  { name: "class", start1: 0, end1: 1, start2: 4, end2: 19 },
  { name: "row", start1: 0, end1: 5, start2: 8, end2: 19 },
  { name: "seat", start1: 0, end1: 13, start2: 16, end2: 19 },
];

const exmapleTicket = [11, 12, 13];

const exampleTickets = [
  [3, 9, 18],
  [15, 1, 5],
  [5, 14, 9],
];

console.time("Day16");
const result = day16Part1(day16MyTicket, day16Rules, day16NearbyTickets);
console.timeEnd("Day16");
console.log(result);
// day16Part1(exmapleTicket, exampleRules, exampleTickets);
