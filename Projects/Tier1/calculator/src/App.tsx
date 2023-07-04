import { useState } from "react";
import Display from "./components/Display";
import "./styles/app.css";

const MAX_DIGIT_ALLOWED = 8;

export default function App() {
  const [inputDisplay, setInputDisplay] = useState("");
  const [outputDisplay, setOutputDisplay] = useState("");
  const handleClick = (text: string) => {
    const numbers = inputDisplay.split(/\D/g);
    const lastTypedNumber = numbers[numbers.length - 1];
    // if the typed button is an operator, proceed
    if ("/*-+".includes(text))
      setInputDisplay(inputDisplay + " " + text + " ");
    else if (lastTypedNumber.length < MAX_DIGIT_ALLOWED)
      // if it is a number, should verify the digit constraint
      setInputDisplay(inputDisplay + text);
  };
  // const precedent = (operator: string) => {
  //   switch (operator) {
  //     case "+":
  //     case "-":
  //       return 1;
  //     case "*":
  //     case "/":
  //       return 2;
  //     default:
  //       return 0;
  //   }
  // };
  // const infixToPostfix = () => {
  //   const tokenizedExpression = inputDisplay.split(" ");

  //   const stack: string[] = [];
  //   const result: string[] = [];

  //   tokenizedExpression.map((symbol) => {
  //     if (symbol.match(/\d/)) result.push(symbol);
  //     else {
  //       while (
  //         stack.length != 0 &&
  //         precedent(symbol) <=
  //           precedent(stack[stack.length - 1])
  //       ) {
  //         result.push(stack.pop() as string);
  //       }
  //       stack.push(symbol);
  //     }
  //   });

  //   while (stack.length != 0) {
  //     result.push(stack.pop() as string);
  //   }

  //   function evaluate(postfixExpression: string[]): number {
  //     const stack: number[] = [];
  //     postfixExpression.map((symbol) => {
  //       if (symbol.match(/\d/)) {
  //         stack.push(parseFloat(symbol));
  //       } else {
  //         const x = stack.pop() as number;
  //         const y = stack.pop() as number;

  //         if (symbol == "+") {
  //           stack.push(y + x);
  //         } else if (symbol == "-") {
  //           stack.push(y - x);
  //         } else if (symbol == "*") {
  //           stack.push(y * x);
  //         } else if (symbol == "/") {
  //           stack.push(y / x);
  //         }
  //       }
  //     });
  //     return stack[0];
  //   }

  //   setOutputDisplay(String(evaluate(result as string[])));
  // };

  return (
    <div className="calculator">
      <Display
        inputDisplay={inputDisplay}
        outputDisplay={outputDisplay}
      />
      <div className="board">
        <div className="row">
          <button
            className="operators"
            type="button"
            onClick={() => setInputDisplay("")}>
            CE
          </button>
          <button
            className="operators"
            type="button"
            onClick={() =>
              setInputDisplay(inputDisplay.slice(0, -1))
            }>
            C
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => handleClick("/")}>
            /
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("7")}>
            7
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("8")}>
            8
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("9")}>
            9
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => handleClick("*")}>
            *
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("4")}>
            4
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("5")}>
            5
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("6")}>
            6
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => handleClick("-")}>
            -
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("1")}>
            1
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("2")}>
            2
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("3")}>
            3
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => handleClick("+")}>
            +
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("0")}>
            +/-
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("0")}>
            0
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => handleClick("0")}>
            ,
          </button>
          <button
            className="equal"
            type="button"
            onClick={() => infixToPostfix()}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
