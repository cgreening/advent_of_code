export function make2DArray<T>(width: number, height: number) {
  const result: Array<T[]> = [];
  for (let i = 0; i < height; i++) {
    result.push(new Array<T>(width));
  }
  return result;
}

export class Sparse4DArray {
  limit: number;
  memory = new Set<number>();
  constructor(limit: number) {
    this.limit = limit;
  }
  getKey(x: number, y: number, z: number, w: number) {
    // big assumption here that we don't go out of range!!!!
    return (
      x * this.limit * this.limit * this.limit +
      y * this.limit * this.limit +
      z * this.limit +
      w
    );
  }
  getValue(x: number, y: number, z: number, w: number): boolean {
    const key = this.getKey(x, y, z, w);
    return this.memory.has(key);
  }
  setValue(x: number, y: number, z: number, w: number) {
    const key = this.getKey(x, y, z, w);
    this.memory.add(key);
  }
}
