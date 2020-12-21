export function make2DArray<T>(width: number, height: number) {
  const result: Array<T[]> = [];
  for (let i = 0; i < height; i++) {
    result.push(new Array<T>(width));
  }
  return result;
}
