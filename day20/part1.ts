import fs from "fs";
import { make2DArray } from "../helpers/arrays";
import {
  crop,
  flipHorizontal,
  flipVertical,
  rotateLeft,
} from "../helpers/image";
{
  function day20(data: string, size: number) {
    type Edges = { top: string; bottom: string; left: string; right: string };

    class Tile {
      tileId: string;
      edges: Edges;
      image: string[][];
      croppedImage: string[][];
      constructor(tileId: string, image: string[][]) {
        this.tileId = tileId;
        const top = image[0].join("");
        const bottom = image[image.length - 1].join("");
        const left = image.map((row) => row[0]).join("");
        const right = image.map((row) => row[row.length - 1]).join("");
        this.edges = { top, bottom, left, right };
        this.image = image;
        this.croppedImage = crop(image, 1);
      }
      flipHorizontal() {
        return new Tile(this.tileId, flipHorizontal(this.image));
      }
      flipVertical() {
        return new Tile(this.tileId, flipVertical(this.image));
      }
      rotateLeft() {
        return new Tile(this.tileId, rotateLeft(this.image));
      }
    }
    function parse() {
      const input = fs.readFileSync(__dirname + data, {
        encoding: "utf-8",
      });
      return input.split("\n\n").map((tile) => {
        const [tileIdString, ...image] = tile.split("\n");
        const tileId = tileIdString.split(" ")[1].replace(":", "");
        return new Tile(
          tileId,
          image.map((row) => row.split(""))
        );
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
        for (let i = 0; i < 4; i++) {
          addTile(tile);
          addTile(tile.flipHorizontal());
          addTile(tile.flipVertical());
          tile = tile.rotateLeft();
        }
      });
    }
    // get all the tiles
    const tiles = parse();
    // and all the tile ids
    const tileIds = new Set<string>([...tiles.map((tile) => tile.tileId)]);
    // generate all the possible edges
    generateAllEdges();

    // is there anything that matches this tile's edge? We only get one match so no need to backtrack!
    const checkForMatch = (tile: Tile, edge: string, edges: EdgeLookup) => {
      const matchingEdges = edges[edge];
      // no matching edges
      if (!matchingEdges) return false;
      // if we are in the match then there should be one other tile as well
      if (tile.tileId in matchingEdges) {
        return Object.keys(matchingEdges).length == 2;
      }
      return Object.keys(matchingEdges).length == 1;
    };

    // is this tile a corner piece?
    const isCornerPiece = (tile: Tile) => {
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
    };

    // find all the corner pieces and log out part1 result
    const corners = tiles.filter((tile) => isCornerPiece(tile));
    const part1Result = corners.reduce(
      (product, corner) => (product *= parseInt(corner.tileId)),
      1
    );
    // find the top left corner
    const corner = corners.find(
      (corner) =>
        !checkForMatch(corner, corner.edges.top, bottomEdges) &&
        !checkForMatch(corner, corner.edges.left, rightEdges) &&
        checkForMatch(corner, corner.edges.right, leftEdges) &&
        checkForMatch(corner, corner.edges.bottom, topEdges)
    )!;

    // the 2D image of the tile ids in their correct place
    const tiles2D = make2DArray<Tile>(size, size);
    // we know the top left corner
    tiles2D[0][0] = corner;
    // tile is used up
    tileIds.delete(corner.tileId);
    // try and fill the rest of the top row
    for (let x = 1; x < size; x++) {
      const previous = tiles2D[0][x - 1];
      const matching = leftEdges[previous.edges.right];
      const availableTiles = Object.keys(matching).filter(
        (key) => tileIds.has(key) && key !== previous.tileId
      );
      tiles2D[0][x] = matching[availableTiles[0]];
      tileIds.delete(matching[availableTiles[0]].tileId);
    }
    // now work down from the top filling the rest of the image
    for (let y = 1; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const previous = tiles2D[y - 1][x];
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
        tiles2D[y][x] = matching[availableTiles[0]];
        tileIds.delete(matching[availableTiles[0]].tileId);
      }
    }
    // build up the image from the tiles
    const pixels = make2DArray<string>(size * 8, size * 8);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        for (let dy = 0; dy < 8; dy++) {
          for (let dx = 0; dx < 8; dx++) {
            pixels[y * 8 + dy][x * 8 + dx] = tiles2D[y][x].croppedImage[dy][dx];
          }
        }
      }
    }
    // this is the sea monster
    const seaMonster = [
      "                  # ",
      "#    ##    ##    ###",
      " #  #  #  #  #  #   ",
    ].map((row) => row.split(""));
    // find sea monsters in the image and return how many rough pixels there are ignoring the sea monster body
    function findSeaMonster(pixels: string[][], totalRough: number) {
      for (let y = 0; y < size * 8 - seaMonster.length; y++) {
        for (let x = 0; x < size * 8 - seaMonster[0].length; x++) {
          let found = true;
          for (let dy = 0; dy < seaMonster.length; dy++) {
            for (let dx = 0; dx < seaMonster[0].length; dx++) {
              if (
                seaMonster[dy][dx] === "#" &&
                pixels[y + dy][x + dx] !== "#"
              ) {
                found = false;
              }
            }
          }
          // we found a seamonster - adjust the rough pixels
          if (found) {
            for (let dy = 0; dy < seaMonster.length; dy++) {
              for (let dx = 0; dx < seaMonster[0].length; dx++) {
                if (
                  seaMonster[dy][dx] === "#" &&
                  pixels[y + dy][x + dx] === "#"
                ) {
                  totalRough--;
                }
              }
            }
          }
        }
      }
      return totalRough;
    }
    // how many rough pixels in our image is there?
    let totalRough = 0;
    for (let y = 0; y < size * 8; y++) {
      for (let x = 0; x < size * 8; x++) {
        if (pixels[y][x] === "#") {
          totalRough++;
        }
      }
    }
    // try every orientation and flip or our pixels to see if there are seamonsters
    // if the rough pixels changes then beware - sea monsters!
    let p = pixels;
    let part2Result = 0;
    for (let i = 0; i < 4; i++) {
      part2Result = findSeaMonster(p, totalRough);
      if (part2Result != totalRough) {
        break;
      }
      part2Result = findSeaMonster(flipHorizontal(p), totalRough);
      if (part2Result != totalRough) {
        break;
      }
      part2Result = findSeaMonster(flipVertical(p), totalRough);
      if (part2Result != totalRough) {
        break;
      }
      p = rotateLeft(p);
    }
    return { part1Result, part2: part2Result };
  }
  console.time("day20");
  const result = day20("/input.txt", 12);
  // const result = day20("/example.txt", 3);
  console.timeEnd("day20");
  console.log(result);
}
