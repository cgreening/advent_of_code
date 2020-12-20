import fs, { readFile } from "fs";
{
  function day20(data: string) {
    class Tile {
      tileId: number;
      image: string[];
      constructor(tileId: number, image: string[]) {
        this.tileId = tileId;
        this.image = image;
      }
    }

    function parse() {
      const input = fs.readFileSync(__dirname + data, {
        encoding: "utf-8",
      });
      const tiles = input.split("\n\n");
      return tiles.map((tile) => {
        const [tileIdString, ...tileImage] = tile.split("\n");
        const tileId = parseInt(tileIdString.split(" ")[1].replace(":", ""));
        return new Tile(tileId, tileImage);
      });
    }

    const tiles = parse();
    console.log("Read", tiles.length, "tiles");
  }

  day20("/input.txt");
}
