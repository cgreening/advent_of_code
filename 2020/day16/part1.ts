import {
  day16NearbyTickets,
  day16MyTicket,
  day16Rules,
  TicketRule,
} from "./data";
{
  function day16Part1(rules: TicketRule[], nearbyTickets: number[][]) {
    function getInvalidFields(rules: TicketRule[], ticket: number[]) {
      let invalidCount = 0;
      for (const field of ticket) {
        const isValid = rules.some(
          (rule) =>
            (field >= rule.start1 && field <= rule.end1) ||
            (field >= rule.start2 && field <= rule.end2)
        );
        if (!isValid) {
          invalidCount += field;
        }
      }
      return invalidCount;
    }

    const invalidRate = nearbyTickets.reduce(
      (total, ticket) => total + getInvalidFields(rules, ticket),
      0
    );
    console.log(invalidRate);
  }

  const exampleRules = [
    { name: "class", start1: 1, end1: 3, start2: 5, end2: 7 },
    { name: "row", start1: 6, end1: 11, start2: 33, end2: 44 },
    { name: "seat", start1: 13, end1: 40, start2: 45, end2: 50 },
  ];

  const exmapleTicket = [7, 1, 14];

  const exampleTickets = [
    [7, 3, 47],
    [40, 4, 50],
    [55, 2, 20],
    [38, 6, 12],
  ];

  day16Part1(day16Rules, day16NearbyTickets);
  // day16Part1(exampleRules, exampleTickets);
}
