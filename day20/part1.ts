import fs, { readFile } from "fs";
import {
  addSyntheticLeadingComment,
  collapseTextChangeRangesAcrossMultipleVersions,
} from "typescript";
{
  function day20(data: string, size: number) {
    function flipVertical(pixels: string[][]) {
      return [...pixels].reverse();
    }
    function flipHorizontal(pixels: string[][]) {
      return pixels.map((row) => [...row].reverse());
    }
    function rotateLeft(pixels: string[][]) {
      const newPixels = new Array<string[]>();
      for (let x = 0; x < pixels.length; x++) {
        const newRow = pixels.map((row) => row[x]);
        newPixels.unshift(newRow);
      }
      return newPixels;
    }

    type Edges = { top: string; bottom: string; left: string; right: string };
    class Tile {
      tileId: string;
      edges: Edges;
      image: string[];
      croppedImage: string[];
      constructor(tileId: string, image: string[]) {
        this.tileId = tileId;
        const top = image[0];
        const bottom = image[image.length - 1];
        const left = image.map((row) => row[0]).join("");
        const right = image.map((row) => row[row.length - 1]).join("");
        this.edges = { top, bottom, left, right };
        this.image = [...image];
        this.croppedImage = image
          .slice(1, image.length - 1)
          .map((row) => row.slice(1, row.length - 1));
      }
      flipHorizontal() {
        const flippedImage = this.image.map((row) =>
          row.split("").reverse().join("")
        );
        return new Tile(this.tileId, flippedImage);
      }
      flipVertical() {
        const flippedImage = [...this.image].reverse();
        return new Tile(this.tileId, flippedImage);
      }
      rotateLeft() {
        const newImage = new Array<string>();
        for (let x = 0; x < this.image.length; x++) {
          const newRow = this.image.map((row) => row.charAt(x)).join("");
          newImage.unshift(newRow);
        }
        return new Tile(this.tileId, newImage);
      }
    }
    function parse() {
      const input = fs.readFileSync(__dirname + data, {
        encoding: "utf-8",
      });
      return input.split("\n\n").map((tile) => {
        const [tileIdString, ...image] = tile.split("\n");
        const tileId = tileIdString.split(" ")[1].replace(":", "");
        return new Tile(tileId, image);
      });
    }

    // edges to tileId
    type EdgeLookup = { [key: string]: { [key: string]: Tile } };
    const leftEdges: EdgeLookup = {};
    const rightEdges: EdgeLookup = {};
    const topEdges: EdgeLookup = {};
    const bottomEdges: EdgeLookup = {};

    // generate all the possible tiles by rotating and flipping horizontal and vertical
    function generateAllEdges() {
      tiles.forEach((tile) => {
        const addTileToEdges = (
          theTile: Tile,
          tileId: string,
          edge: string,
          edges: EdgeLookup
        ) => {
          if (!(edge in edges)) {
            edges[edge] = {};
          }
          edges[edge][tileId] = theTile;
        };
        const addTile = (theTile: Tile) => {
          addTileToEdges(
            theTile,
            theTile.tileId,
            theTile.edges.left,
            leftEdges
          );
          addTileToEdges(
            theTile,
            theTile.tileId,
            theTile.edges.right,
            rightEdges
          );
          addTileToEdges(theTile, theTile.tileId, theTile.edges.top, topEdges);
          addTileToEdges(
            theTile,
            theTile.tileId,
            theTile.edges.bottom,
            bottomEdges
          );
        };
        for (let i = 0; i < 5; i++) {
          addTile(tile);
          addTile(tile.flipHorizontal());
          addTile(tile.flipVertical());
          // addTile(tile.flipVertical().flipHorizontal());
          // addTile(tile.flipHorizontal().flipVertical());
          tile = tile.rotateLeft();
        }
      });
    }

    const tiles = parse();
    const tileIds = new Set<string>([...tiles.map((tile) => tile.tileId)]);

    const checkForMatch = (tile: Tile, edge: string, edges: EdgeLookup) => {
      const matchingEdges = edges[edge];
      if (!matchingEdges) return false;
      if (tile.tileId in matchingEdges) {
        return Object.keys(matchingEdges).length >= 2;
      }
      return Object.keys(matchingEdges).length > 0;
    };

    function isCornerPiece(tile: Tile) {
      // a tile is a corner piece if it has two edges that don't match anything
      let result = 0;
      if (checkForMatch(tile, tile.edges.top, bottomEdges)) {
        result++;
      }
      if (checkForMatch(tile, tile.edges.bottom, topEdges)) {
        result++;
      }
      if (checkForMatch(tile, tile.edges.left, rightEdges)) {
        result++;
      }
      if (checkForMatch(tile, tile.edges.right, leftEdges)) {
        result++;
      }
      return result === 2;
    }

    parse();
    generateAllEdges();

    const corners = tiles.filter((tile) => isCornerPiece(tile));
    console.log(
      "Part1",
      corners.reduce(
        (product, corner) => (product *= parseInt(corner.tileId)),
        1
      )
    );
    const corner = corners.find(
      (corner) =>
        !checkForMatch(corner, corner.edges.top, bottomEdges) &&
        !checkForMatch(corner, corner.edges.left, rightEdges) &&
        checkForMatch(corner, corner.edges.right, leftEdges) &&
        checkForMatch(corner, corner.edges.bottom, topEdges)
    )!;
    console.log("Found corner", corner.tileId);

    console.log(
      checkForMatch(corner, corner.edges.top, bottomEdges),
      checkForMatch(corner, corner.edges.left, rightEdges),
      checkForMatch(corner, corner.edges.right, leftEdges),
      checkForMatch(corner, corner.edges.bottom, topEdges)
    );

    const image: Array<Tile[]> = [];
    for (let i = 0; i < size; i++) {
      image.push(new Array<Tile>(size));
    }
    image[0][0] = corner;
    // tile is used up
    tileIds.delete(corner.tileId);
    // try and fill the rest of the top row
    for (let x = 1; x < size; x++) {
      const previous = image[0][x - 1];
      const matching = leftEdges[previous.edges.right];
      const availableTiles = Object.keys(matching).filter(
        (key) => tileIds.has(key) && key !== previous.tileId
      );
      if (availableTiles.length > 1) {
        throw new Error(`More than 1 match! at index ${x}`);
      }
      if (availableTiles.length !== 1) {
        throw new Error(`No match at index ${x}`);
      }
      image[0][x] = matching[availableTiles[0]];
      tileIds.delete(matching[availableTiles[0]].tileId);
    }
    console.log("*** Filling the rest");
    // now work down filling the rest of the image
    for (let y = 1; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const previous = image[y - 1][x];
        const matching = topEdges[previous.edges.bottom];
        const availableTiles = Object.keys(matching).filter(
          (key) => tileIds.has(key) && key !== previous.tileId
        );
        if (availableTiles.length > 1) {
          throw new Error(`More than 1 match! at index ${x},${y}`);
        }
        if (availableTiles.length !== 1) {
          throw new Error(`No match at index ${x}`);
        }
        image[y][x] = matching[availableTiles[0]];
        tileIds.delete(matching[availableTiles[0]].tileId);
      }
    }
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        row.push(image[y][x].tileId);
      }
      console.log(row.join(","));
    }
    // build up the image
    const pixels: Array<string[]> = [];
    for (let i = 0; i < size * 8; i++) {
      pixels.push(new Array<string>(size * 8));
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        for (let dy = 0; dy < 8; dy++) {
          for (let dx = 0; dx < 8; dx++) {
            pixels[y * 8 + dy][x * 8 + dx] = image[y][x].croppedImage[
              dy
            ].charAt(dx);
          }
        }
      }
    }
    for (let y = 0; y < size * 8; y++) {
      console.log(pixels[y].join(""));
    }

    const seaMonster1 = [
      "                  # ",
      "#    ##    ##    ###",
      " #  #  #  #  #  #   ",
    ];
    function findDragong(pixels: string[][]) {
      // count the sea monsters
      let totalRough = 0;
      for (let y = 0; y < size * 8; y++) {
        for (let x = 0; x < size * 8; x++) {
          if (pixels[y][x] === "#") totalRough++;
        }
      }
      for (let y = 0; y < size * 8 - seaMonster1.length; y++) {
        for (let x = 0; x < size * 8 - seaMonster1[0].length; x++) {
          let found = true;
          let roughHere = 0;
          for (let dy = 0; dy < seaMonster1.length; dy++) {
            for (let dx = 0; dx < seaMonster1[0].length; dx++) {
              if (
                seaMonster1[dy].charAt(dx) === "#" &&
                pixels[y + dy][x + dx] !== "#"
              ) {
                found = false;
              }
            }
          }
          if (found) {
            console.log("Found dragon at", y, x);
            for (let dy = 0; dy < seaMonster1.length; dy++) {
              for (let dx = 0; dx < seaMonster1[0].length; dx++) {
                if (
                  seaMonster1[dy].charAt(dx) === "#" &&
                  pixels[y + dy][x + dx] === "#"
                ) {
                  totalRough--;
                }
              }
            }
          }
        }
      }
      console.log("Total Rough=", totalRough);
    }
    let p = pixels;
    for (let i = 0; i < 5; i++) {
      console.log(i);
      findDragong(p);
      findDragong(flipHorizontal(p));
      findDragong(flipVertical(p));
      p = rotateLeft(p);
    }
  }
  const result = day20("/input.txt", 12);
  // const result = day20("/example.txt", 3);
  console.log(result);
}
