function part2() {
  const example = {
    busStrs: "7,13,x,x,59,x,31,19",
  };

  const example2 = {
    busStrs: "17,x,13,19",
  };

  const example3 = {
    busStrs: "67,7,59,61",
  };

  const input = {
    departTime: 1013728,
    busStrs:
      "23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,733,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37",
  };

  function doit(input: { busStrs: string }) {
    const { busStrs } = input;
    const busses = busStrs
      .split(",")
      .map((bus, index) => ({
        index,
        number: bus !== "x" ? parseInt(bus, 10) : -1,
      }))
      .filter((bus) => bus.number != -1);

    let equations = [];
    for (const bus of busses) {
      equations.push(`(t+${bus.index}) mod ${bus.number}=0`);
    }
    return `Visit www.wolframalpha.com/input?i=${encodeURIComponent(
      "solve " + equations.join(",")
    )}`;
  }
  console.time("Part2");
  console.log("answer", doit(input));
  console.timeEnd("Part2");
}

part2();
