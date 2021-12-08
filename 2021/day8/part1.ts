import fs from "fs";
import {
  collapseTextChangeRangesAcrossMultipleVersions,
  OutputFileType,
} from "typescript";
import { rotateLeft } from "../../helpers/image";
import input from "../day5/input";

function readInput(file: string) {
  const lines = fs.readFileSync(file, "utf-8").split("\n");
  const data = lines.map((line) => {
    const [input, output] = line.split(" | ");
    return { input: input.split(" "), output: output.split(" ") };
  });
  return data;
}

function part1() {
  const input = readInput("./2021/day8/input.txt");
  const interestingOutputs = new Set([2, 4, 3, 7]);
  let count = 0;
  input.forEach((line) => {
    count += line.output.filter((output) =>
      interestingOutputs.has(output.length)
    ).length;
  });
  console.log(count);
}

function intersect(a: string[], b: string[]) {
  return a.filter((i) => b.includes(i));
}

function union(a: string[], b: string[]) {
  return [...new Set([...a, ...b])];
}

function subtract(a: string[], b: string[]) {
  return a.filter((i) => !b.includes(i));
}

function processInput(input: string[], output: string[]) {
  const one = (input.find((line) => line.length === 2) || "").split("");
  const four = (input.find((line) => line.length === 4) || "").split("");
  const seven = (input.find((line) => line.length === 3) || "").split("");
  const eight = (input.find((line) => line.length === 7) || "").split("");

  if (!(one.length && four.length && seven.length && eight.length)) {
    console.log("Missing known digit");
  }

  const mapping: { [key: number]: string[] } = {};
  input.forEach((i) => {
    const digits = i.split("");
    // handle the easy cases
    if (i.length === 2) {
      mapping[1] = digits;
      return;
    }
    if (i.length === 4) {
      mapping[4] = digits;
      return;
    }
    if (i.length === 3) {
      mapping[7] = digits;
      return;
    }
    if (i.length === 7) {
      mapping[8] = digits;
      return;
    }
    // the hard cases
    // 2, 3, 5
    if (digits.length === 5) {
      // is it a 3?
      if (intersect(digits, one).length == 2) {
        mapping[3] = digits;
        return;
      }
      // is it a 5?
      if (
        intersect(digits, one).length === 1 &&
        intersect(digits, four).length === 3 &&
        intersect(digits, seven).length === 2 &&
        intersect(digits, eight).length === 5
      ) {
        mapping[5] = digits;
        return;
      }
      // is it a 2?
      if (
        intersect(digits, one).length === 1 &&
        intersect(digits, four).length === 2 &&
        intersect(digits, seven).length === 2 &&
        intersect(digits, eight).length === 5
      ) {
        mapping[2] = digits;
        return;
      }
    }
    if (digits.length === 6) {
      if (
        intersect(digits, one).length === 1 &&
        intersect(digits, four).length === 3 &&
        intersect(digits, seven).length === 2 &&
        intersect(digits, eight).length === 6
      ) {
        mapping[6] = digits;
        return;
      }
      // 9 needs f
      if (
        intersect(digits, one).length === 2 &&
        intersect(digits, four).length === 4 &&
        intersect(digits, seven).length === 3 &&
        intersect(digits, eight).length === 6
      ) {
        mapping[9] = digits;
        return;
      }
    }
    // must be 0
    mapping[0] = digits;
  });
  const segmentMapping: { [key: string]: string } = {};
  segmentMapping[subtract(mapping[8], mapping[0])[0]] = "d";
  segmentMapping[subtract(mapping[7], mapping[1])[0]] = "a";
  segmentMapping[subtract(mapping[5], union(mapping[1], mapping[2]))[0]] = "b";
  segmentMapping[subtract(mapping[2], union(mapping[5], mapping[6]))[0]] = "c";
  segmentMapping[subtract(mapping[2], union(mapping[5], mapping[1]))[0]] = "e";
  segmentMapping[subtract(mapping[7], mapping[2])[0]] = "f";
  segmentMapping[subtract(mapping[3], union(mapping[4], mapping[7]))[0]] = "g";
  const characters: { [key: string]: number } = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
  };
  let number = "";
  output.forEach((o) => {
    const segments = o.split("");
    const mapped = segments.map((s) => segmentMapping[s]);
    const mappedString = mapped.sort().join("");
    number += String(characters[mappedString]);
  });
  return parseInt(number, 10);
}

function part2() {
  const input = readInput("./2021/day8/input.txt");
  let result = 0;
  input.forEach((i) => {
    result += processInput(i.input, i.output);
  });
  console.log(result);
}

part2();
