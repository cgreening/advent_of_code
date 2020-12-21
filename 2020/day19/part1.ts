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

    // recursively turn the rule into a regex
    function createRegexFromRules(
      rule: string,
      rules: { [key: string]: string },
      depth = 0
    ): string {
      // arbitrary cut off point - found by experimentation...
      if (depth > 15) {
        return "";
      }
      const orRules = rule.split(" | ");
      return orRules
        .map((subRule) => {
          return (
            "(?:" +
            subRule
              .split(" ")
              .map((ruleIndex) => {
                if (ruleIndex === "+") {
                  return "+";
                }
                let lookup = rules[ruleIndex];
                // is it a constant?
                if (lookup.startsWith('"')) {
                  lookup = lookup.replace(/\"/g, "");
                  return "(?:" + lookup + ")";
                } else {
                  const subRegex = createRegexFromRules(
                    lookup,
                    rules,
                    depth + 1
                  );
                  if (subRegex.length > 0) {
                    return "(?:" + subRegex + ")";
                  } else {
                    return "";
                  }
                }
              })
              .join("") +
            ")"
          );
        })
        .join("|");
    }

    const regexString = createRegexFromRules(rules["0"], rules);
    const regex = new RegExp("^" + regexString + "$");
    const result = messages.filter((message) => regex.test(message)).length;
    return result;
    // messages.forEach((message) => console.log(message, regex.test(message)));
  }

  console.time("Part19");
  const result = day19("/input.txt");
  console.timeEnd("Part19");
  console.log(result);
}
