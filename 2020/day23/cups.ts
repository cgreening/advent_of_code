import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";
import { isConstructorTypeNode } from "typescript";

function day23(input: string) {
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

  const findValue = (value: number, head: Node) => {
    let search = head;
    do {
      if (search.value === value) {
        return search;
      }
    } while (search != head);
  };

  const pushValue = (value: number, head: Node) => {
    const newNode = new Node(value);
    newNode.right = head;
    newNode.left = head.left!.right;
    head.left!.right = newNode;
    head.left = newNode;
  };

  const dump = (head: Node) => {
    const values: number[] = [];
    let search = head;
    do {
      values.push(search.value);
      search = search.right!;
    } while (search != head);
    return values.join(" ");
  };

  const cupsArray = input.split("").map((cup) => parseInt(cup, 10));
  const maxCup = cupsArray.reduce((m, c) => Math.max(m, c), cupsArray[0]);
  const minCup = cupsArray.reduce((m, c) => Math.min(m, c), cupsArray[0]);

  let cups = new Node(cupsArray[0]);
  cupsArray.slice(1).forEach((cup) => pushValue(cup, cups));
  console.log(dump(cups));

  let currentCup = cups;
  for (let move = 0; move < 10; move++) {
    console.log(`-- move ${move + 1} --`);
    console.log(`cups: (${currentCup?.value}) ${dump(cups)}`);
    // cut out three cups to the right of the current cup
    const takenCups = currentCup!.right!;
    currentCup.right = currentCup?.right?.right?.right;
    console.log(
      `pick up ${takenCups.value} ${takenCups!.right!.value} ${
        takenCups!.right!.value
      }`
    );
    // where to put the cups?
    /*    let destination = findValue(currentCup.value - 1, currentCup);

    console.log(`destination ${destination}`);
    const destIndex = cups.indexOf(destination);
    console.log("Dest index = ", destIndex);
    if (destIndex == 0) {
      cups = [...takenCups, ...cups];
    } else {
      cups = [
        ...cups.slice(0, destIndex + 1),
        ...takenCups,
        ...cups.slice(destIndex + 1, cups.length),
      ];
    }
    console.log();
    currentCupIndex = (cups.indexOf(currentCup) + 1) % cups.length;*/
  }
  console.log(dump(cups));
}

day23("389125467");
