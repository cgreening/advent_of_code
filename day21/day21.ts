import fs from "fs";
import { intersection } from "../helpers/set";
import singleEntryReduction from "../helpers/singleEntryReducer";

function day21(inputFile: string) {
  console.time("Day19");
  // read in the input getting the alergens and ingredients for each line
  const foods = fs
    .readFileSync(__dirname + inputFile, { encoding: "utf-8" })
    .split("\n")
    .map((food) => {
      const [ingredientsString, alergensString] = food.split(" (contains ");
      const ingredients = ingredientsString.split(" ");
      const alergens = alergensString.replace(/[),]/g, "").split(" ");
      return { alergens, ingredients };
    });
  // create a mapping from alergen to unique list of ingredients that contain that alergen
  const alergenToIngredient = foods.reduce(
    (map, food) =>
      food.alergens.reduce((map, alergen) => {
        const ingredients = new Set(food.ingredients);
        const existingIngredients = map.get(alergen) || ingredients;
        return map.set(alergen, intersection(existingIngredients, ingredients));
      }, map),
    new Map<string, Set<string>>()
  );
  // use the above to create a mapping from the unique ingredients to the alergen
  const ingredientToAlergen = Array.from(alergenToIngredient.entries()).reduce(
    (map, [alergen, ingredients]) =>
      Array.from(ingredients.values()).reduce((map, ingredient) => {
        const alergens = map.get(ingredient) || new Set<string>();
        alergens.add(alergen);
        return map.set(ingredient, alergens);
      }, map),
    new Map<string, Set<string>>()
  );

  // work out ingredients with no alergen count for part 1
  const part1 = foods.reduce(
    (total, food) =>
      total +
      food.ingredients.filter(
        (ingredient) => !(ingredient in ingredientToAlergen)
      ).length,
    0
  );

  // reduce the ingredients to alergens so each ingredient only has one alergen
  const dangerousIngredients = Array.from(
    ingredientToAlergen.entries()
  ).map(([ingredient, alergens]) => ({ key: ingredient, values: alergens }));
  // and do the reductio
  const result = singleEntryReduction(dangerousIngredients);
  // sort the dangerous ingredients by the alergen
  const sortedDangerousIngredients = Array.from(result.entries())
    .sort((a, b) => {
      return a[1].localeCompare(b[1]);
    })
    .map((a) => a[0])
    .join(",");
  console.timeEnd("Day19");
  console.log("part1", part1);
  console.log("Part2", sortedDangerousIngredients);
}
day21("/input.txt");
