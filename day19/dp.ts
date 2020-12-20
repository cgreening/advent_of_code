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
        result = rule.split(" | ").some((option) => match(input, option));
      } else if (rule.includes('"')) {
        result = `"${input}"` === rule;
      } else if (rule.includes(" ")) {
        const [first, ...rest] = rule.split(" ");
        for (let i = 1; i < input.length; i++) {
          result =
            match(input.substr(0, i), first) &&
            match(input.substr(i, input.length - i), rest.join(" "));
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
