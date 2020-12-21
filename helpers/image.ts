export function flipVertical(pixels: string[][]) {
  return [...pixels].reverse();
}
export function flipHorizontal(pixels: string[][]) {
  return pixels.map((row) => [...row].reverse());
}
export function rotateLeft(pixels: string[][]) {
  const newPixels = new Array<string[]>();
  for (let x = 0; x < pixels.length; x++) {
    const newRow = pixels.map((row) => row[x]);
    newPixels.unshift(newRow);
  }
  return newPixels;
}
export function crop(pixels: string[][], amount: number) {
  return pixels
    .slice(amount, pixels.length - amount)
    .map((row) => row.slice(amount, row.length - amount));
}
