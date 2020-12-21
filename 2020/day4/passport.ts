import fs from "fs";
{
  interface Passport {
    eyr?: string;
    iyr?: string;
    hcl?: string;
    byr?: string;
    ecl?: string;
    hgt?: string;
    pid?: string;
    cid?: string;
  }

  const raw = fs.readFileSync(__dirname + "/passports.txt", {
    encoding: "utf-8",
  });

  const passports: Array<{ [key: string]: string }> = [];
  let passport: { [key: string]: string } = {};
  raw.split("\n").forEach((row) => {
    if (row.length === 0) {
      passports.push(passport);
      passport = {};
    } else {
      row.split(" ").forEach((pair) => {
        const [key, value] = pair.split(":");
        passport[key] = value;
      });
    }
  });

  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  function isValid(passport: Passport) {
    return !required.some((key) => !(key in passport));
  }

  const valid = passports.filter(isValid);
  console.log(valid.length);

  function yearValidator(min: number, max: number) {
    return (value: string): boolean => {
      if (/^\d\d\d\d$/.test(value)) {
        const number = parseInt(value, 10);
        return number >= min && number <= max;
      }
      return false;
    };
  }

  function heightValidator(value: string) {
    if (/^\d+cm$/.test(value)) {
      const number = parseInt(value, 10);
      return number >= 150 && number <= 193;
    }
    if (/^\d+in$/.test(value)) {
      const number = parseInt(value, 10);
      return number >= 59 && number <= 76;
    }
    return false;
  }

  function regexValidator(regex: RegExp) {
    return function (value: string) {
      return regex.test(value);
    };
  }

  const validation = {
    byr: yearValidator(1920, 2002), // - four digits; at least 1920 and at most 2002.
    iyr: yearValidator(2010, 2020), // (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr: yearValidator(2020, 2030), //(Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt: heightValidator, //(Height) - a number followed by either cm or in:
    //If cm, the number must be at least 150 and at most 193.
    // If in, the number must be at least 59 and at most 76.
    hcl: regexValidator(/^#[0-9a-z]{6}$/), //- a # followed by exactly six characters 0-9 or a-f.
    ecl: regexValidator(/^(amb|blu|brn|gry|grn|hzl|oth)$/), // (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid: regexValidator(/^\d{9}$/), // (Passport ID) - a nine-digit number, including leading zeroes.
  };

  function isValid2(passport: Passport) {
    return Object.keys(validation).every((key) => {
      if (!(key in passport)) {
        return false;
      }
      const value = (passport as any)[key];
      return (validation as any)[key](value);
    });
  }

  const valid2 = passports.filter(isValid2);
  console.log(valid2.length);
}
