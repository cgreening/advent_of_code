const example = {
  departTime: 939,
  busStrs: "7,13,x,x,59,x,31,19",
};

const input = {
  departTime: 1013728,
  busStrs:
    "23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,733,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37",
};

function doit(input: { departTime: number; busStrs: string }) {
  const { departTime, busStrs } = input;
  const busses = busStrs
    .split(",")
    .filter((bus) => bus !== "x")
    .map((bus) => parseInt(bus, 10));

  console.log(busses);

  const times = busses.map((bus) => ({
    bus,
    time: Math.ceil(departTime / bus) * bus,
  }));

  const bestTime = times.reduce(
    (min, current) => {
      if (current.time < min.time) {
        return current;
      } else {
        return min;
      }
    },
    { bus: -1, time: Number.MAX_VALUE }
  );

  console.log("Best is", bestTime);
  console.log(bestTime.bus * (bestTime.time - departTime));
}

console.time("Part1");
doit(input);
console.timeEnd("Part1");
