function run(
  dx: number,
  dy: number,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
) {
  let x = 0,
    y = 0;
  let maxHeight = 0;
  for (let step = 0; step < 500; step++) {
    x += dx;
    y += dy;
    if (y > maxHeight) {
      maxHeight = y;
    }
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return { result: true, maxHeight };
    }
    if (dx > 0) {
      dx--;
    }
    if (dx < 0) {
      dx++;
    }
    dy--;
  }
  return { result: false, maxHeight };
}

function part1() {
  const tx1 = 209,
    tx2 = 238,
    ty1 = -86,
    ty2 = -59;

  // const tx1 = 20,
  //   tx2 = 30,
  //   ty1 = -10,
  //   ty2 = -5;
  let maxY = 0;
  let matching = new Set<string>();
  for (let initialX = 1; initialX < 500; initialX++) {
    for (let initialY = -1000; initialY < 1000; initialY++) {
      const { result, maxHeight } = run(initialX, initialY, tx1, tx2, ty1, ty2);
      if (result) {
        matching.add(`${initialX},${initialY}`);
        if (maxHeight > maxY) {
          maxY = maxHeight;
        }
      }
    }
  }
  console.log(maxY);
  console.log(matching.size);
}

part1();
