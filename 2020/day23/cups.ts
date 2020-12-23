import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";
import { isConstructorTypeNode } from "typescript";

function day23(input: string) {
  console.time("Processing");
  // parse the data
  const cupsArray = input.split("").map((cup) => parseInt(cup, 10));
  const maxCup = 1000000;
  const minCup = 1;

  class Node {
    value: number;
    right: Node | undefined;
    left: Node | undefined;
    constructor(value: number) {
      this.value = value;
      this.left = this;
      this.right = this;
    }
  }

  const pushValue = (value: number, head: Node) => {
    const newNode = new Node(value);
    newNode.right = head;
    newNode.left = head.left!.right;
    head.left!.right = newNode;
    head.left = newNode;
    return newNode;
  };
  // quick lookup from label to cup
  const lookup = Array<Node>(1000001);

  // add the fixed cups
  let head = new Node(cupsArray[0]);
  lookup[cupsArray[0]] = head;
  cupsArray.slice(1).forEach((cup) => {
    const node = pushValue(cup, head);
    lookup[cup] = node;
  });
  // add the remaining 1m cups
  for (let i = 10; i <= 1000000; i++) {
    const node = pushValue(i, head);
    lookup[i] = node;
  }
  // start the game
  let currentCup = head;
  for (let move = 0; move < 10000000; move++) {
    // cut out three cups to the right of the current cup
    const takenCups = currentCup!.right!;
    currentCup.right = currentCup?.right?.right?.right?.right;
    // where to put the cups?
    let searchValue = currentCup.value;
    let destination: Node | undefined = undefined;
    while (destination === undefined) {
      // decrease search and wrap around
      searchValue = searchValue - 1;
      if (searchValue < minCup) {
        searchValue = maxCup;
      }
      // don't include the cups we've taken out
      if (
        searchValue !== takenCups.value &&
        searchValue !== takenCups.right!.value &&
        searchValue !== takenCups.right!.right!.value
      ) {
        destination = lookup[searchValue];
      }
    }
    // insert the cups back into the list
    takenCups.right!.right!.right = destination.right;
    destination.right = takenCups;
    // move to the next cup
    currentCup = currentCup.right!;
  }
  console.timeEnd("Processing");
  // part 2 results
  const one = lookup[1];
  console.log(
    "Done!",
    one.right!.value,
    one.right!.right!.value,
    one.right!.value * one.right!.right!.value
  );
}

day23("916438275");
