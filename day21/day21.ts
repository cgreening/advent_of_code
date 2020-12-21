import fs from "fs";
import Heap from "heap";
import { intersection } from "../helpers/set";

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
  type IngredientAndAlgergens = { ingredient: string; alergens: Set<string> };
  // use a min heap to make it easier to pop off the ingredient with the smallest number of alergens
  const heapSorter = (a: IngredientAndAlgergens, b: IngredientAndAlgergens) =>
    a.alergens.size - b.alergens.size;
  // convert to a nicer data structure
  const dangerousIngredients = Array.from(
    ingredientToAlergen.entries()
  ).map(([ingredient, alergens]) => ({ ingredient, alergens }));
  // and do the reductio
  Heap.heapify<IngredientAndAlgergens>(dangerousIngredients, heapSorter);
  const result = new Map<string, string>();
  while (dangerousIngredients.length) {
    const smallest = Heap.pop(dangerousIngredients, heapSorter);
    if (smallest.alergens.size !== 1) {
      throw new Error("Should only have one alergen");
    }
    // update the result
    const field = [...smallest.alergens][0];
    result.set(smallest.ingredient, field);
    // remove this field from everything else
    dangerousIngredients.forEach((entry) => entry.alergens.delete(field));
    // update the heap - this is a bit inefficient really - should just update the items that had the field...
    Heap.heapify(dangerousIngredients, heapSorter);
  }
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
