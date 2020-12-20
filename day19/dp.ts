import fs, { readFile } from "fs";
{
  function day19(data: string) {
    const input = fs.readFileSync(__dirname + data, {
      encoding: "utf-8",
    });
    const [rulesString, messagesString] = input.split("\n\n");
    const messages = messagesString.split("\n");
    const ruleStrings = rulesString.split("\n");

    // convert rules to quick lookup
    const rules: { [key: string]: string } = ruleStrings.reduce(
      (previous, rule) => {
        const [key, value] = rule.split(": ");
        return { ...previous, [key]: value };
      },
      {}
    );

    const memo: { [key: string]: boolean } = {};

    function match(input: string, rule: string): boolean {
      const key = rule + input;
      if (key in memo) {
        return memo[key];
      }
      let result = false;
      if (rule.includes("|")) {
        // need to match one of the options in the rule
        result = rule.split(" | ").some((option) => match(input, option));
      } else if (rule.includes('"')) {
        // terminal rule input needs to equal is (a or b)
        result = `"${input}"` === rule;
      } else if (rule.includes(" ")) {
        // we've got a rule with multiple subrules - e.g. "5 6 7 8 9"
        // math the first rule and then the rest of the rules
        const [firstRule, ...remainingRules] = rule.split(" ");
        // the start of the input must match the first rule
        // and the remaining input must match the rest of the rules
        for (let i = 1; i < input.length; i++) {
          const startInput = input.substr(0, i);
          const remainingInput = input.substr(i, input.length - i);
          result =
            match(startInput, firstRule) &&
            match(remainingInput, remainingRules.join(" "));
          if (result) {
            break;
          }
        }
      } else {
        result = match(input, rules[rule]);
      }
      memo[key] = result;
      return result;
    }

    const result = messages.filter((message) => match(message, rules["0"]))
      .length;
    return result;
  }

  console.time("Part19");
  const result = day19("/input.txt");
  console.timeEnd("Part19");
  console.log(result);
}
