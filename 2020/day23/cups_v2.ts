function play(cups: number[], iterations: number) {
  for (let i = 10; i <= 1000000; i++) {
    cups.push(i);
  }
  console.time("Processing");

  const max = cups.reduce((m, c) => Math.max(m, c), 0);
  const circle = new Array<number>(max + 1);

  for (let i = 0; i < cups.length - 1; i++) {
    circle[cups[i]] = cups[i + 1];
  }
  circle[cups[cups.length - 1]] = cups[0];
  let current = circle[cups[cups.length - 1]];

  for (let move = 0; move < iterations; move++) {
    const picked_up: number[] = [];
    let next = current;
    for (let i = 0; i < 3; i++) {
      next = circle[next];
      picked_up.push(next);
    }
    let destination = current;
    while (true) {
      destination -= 1;
      if (destination < 1) {
        destination = max;
      }
      if (!picked_up.includes(destination)) {
        break;
      }
    }
    let temp = circle[picked_up[picked_up.length - 1]];
    circle[picked_up[picked_up.length - 1]] = circle[destination];
    circle[destination] = picked_up[0];
    circle[current] = temp;

    current = temp;
  }

  console.timeEnd("Processing");
  const a = circle[1];
  const b = circle[a];
  console.log(a, b, a * b);
}

play(
  "916438275".split("").map((n) => parseInt(n, 10)),
  10000000
);
