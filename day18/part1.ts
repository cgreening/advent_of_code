import { isExpressionStatement } from "typescript";

function day18Part1() {
  function evaluateExpression(expr: string) {
    interface Expression {
      evaluate(): number;
      dump(): string;
    }

    class NumberExpression implements Expression {
      value: number;
      constructor(value: number) {
        this.value = value;
      }
      evaluate() {
        return this.value;
      }
      dump() {
        return `${this.value}`;
      }
    }

    class AddExpression implements Expression {
      left: Expression;
      right: Expression;
      constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
      }
      evaluate() {
        return this.left.evaluate() + this.right.evaluate();
      }
      dump() {
        return `(${this.left.dump()} + ${this.right.dump()})`;
      }
    }
    class MulExpression implements Expression {
      left: Expression;
      right: Expression;
      constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
      }
      evaluate() {
        return this.left.evaluate() * this.right.evaluate();
      }
      dump() {
        return `(${this.left.dump()} * ${this.right.dump()})`;
      }
    }

    function getExpression(terms: string[]): Expression {
      let leftExpression: Expression | null = null;
      while (terms.length > 0) {
        const term = terms.shift();
        if (!term) {
          throw new Error("Out of expressions");
        }
        if (term === "(") {
          // find the closing bracked
          let bracketCount = 1;
          let subTerms: string[] = [];
          while (bracketCount > 0) {
            const newTerm = terms.shift();
            if (!newTerm) {
              throw new Error("Mismatched brackets");
            }
            if (newTerm === "(") {
              bracketCount++;
            } else if (newTerm === ")") {
              bracketCount--;
            }
            if (bracketCount != 0) {
              subTerms.push(newTerm);
            }
          }
          return getExpression(subTerms);
        } else if (term === "+") {
          if (!leftExpression) {
            throw new Error("Missing left term");
          }
          leftExpression = new AddExpression(
            leftExpression,
            getExpression(terms)
          );
        } else if (term === "*") {
          if (!leftExpression) {
            throw new Error("Missing left term");
          }
          leftExpression = new MulExpression(
            leftExpression,
            getExpression(terms)
          );
        } else {
          leftExpression = new NumberExpression(parseInt(term, 10));
        }
      }
      if (leftExpression == null) {
        throw new Error("Did not parse");
      }
      return leftExpression;
    }

    expr = expr.replace(/\(/g, "( ");
    expr = expr.replace(/\)/g, " )");
    console.log(expr);
    const expression = getExpression(expr.split(" "));
    console.log("Parsed:", expression.dump());
    return expression.evaluate();
  }

  console.log(evaluateExpression("2 * 3 + (4 * 5)"));
}

day18Part1();

/*
2 * 3 + (4 * 5)

I see a 2, create a numeric expression
I see a *, create mul expression with 2 on left and new expression on right
  I see a 3, create a numeric expression
  I see a +, create an add expression with 3 on left and new expression on right
    I see a bracket, start new parse with string containing bracketed expression
*/
