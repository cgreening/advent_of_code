import fs from "fs";

interface Content {
  colour: string;
  count: number;
}

const lines = fs
  .readFileSync(__dirname + "/rules.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const colourToContent = lines.reduce((map, line) => {
  const [colour, contentsString] = line.split(" bags contain ");
  const contents = contentsString.split(", ").map((quantityColor) => {
    const matches = quantityColor.match(/(\d*) (.*) bag[s\.]*/);
    if (!matches) {
      throw new Error("Regex failed");
    }
    const colour = matches[2].replace(".", "");
    const count = colour === "other" ? 0 : parseInt(matches[1], 10);
    return { colour, count };
  });
  return map.set(colour, contents);
}, new Map<string, Content[]>());

// potential memoize opportunity
function canContainColour(bagColour: string, containedColor: string): boolean {
  const contents = colourToContent.get(bagColour) || [];
  if (contents.some((content) => content.colour === containedColor)) {
    return true;
  }
  return contents.some((content) =>
    canContainColour(content.colour, containedColor)
  );
}

// potential memoize opportunity
function countBags(colour: string): number {
  const contents = colourToContent.get(colour) || [];
  return (
    // +1 for the container bag
    1 +
    contents.reduce(
      (total, content) => total + content.count * countBags(content.colour),
      0
    )
  );
}

// part 1
const canContainBags = [...colourToContent.keys()].filter((bagColour) =>
  canContainColour(bagColour, "shiny gold")
);

console.log(canContainBags.length);

// part 2 - subtract 1 as we don't count our shiny gold bag
const neededBags = countBags("shiny gold") - 1;
console.log(neededBags);
