import { useState } from "react";
import Display from "./components/Display";
import "./styles/app.css";

export default function App() {
  const [mainDisplay, setMainDisplay] = useState("0");
  const [auxiliaryDisplay, setAuxiliaryDisplay] =
    useState("");
  const [numberWasClicked, setNumberWasClicked] =
    useState(false);

  function clearDisplay(): void {
    setMainDisplay("0");
    setAuxiliaryDisplay("");
    setNumberWasClicked(false);
  }

  function deleteLastDigit() {
    if (mainDisplay.length > 1)
      setMainDisplay(mainDisplay.slice(0, -1));
    else setMainDisplay("0");
  }

  function numberClicked(number: string) {
    let text = "";
    if (!numberWasClicked) text = number;
    else if (mainDisplay.length < 8)
      text = mainDisplay + number;
    else text = mainDisplay;
    setMainDisplay(text);
    setNumberWasClicked(true);
  }

  function computeOperator(operator: string) {
    let text = mainDisplay;
    if (
      auxiliaryDisplay === "" ||
      auxiliaryDisplay.at(-1) === "="
    ) {
      switch (operator) {
        case "+":
          text += " +";
          break;
        case "-":
          text += " -";
          break;
        case "*":
          text += " *";
          break;
        case "/":
          text += " /";
          break;
        default:
          throw Error("Operator not found.");
      }
    } else {
      if (numberWasClicked) {
        const equation = auxiliaryDisplay.split(" ");
        const operand = Number(equation[0]);
        let result = 0;

        switch (equation[1]) {
          case "+":
            result = operand + Number(mainDisplay);
            break;
          case "-":
            result = operand - Number(mainDisplay);
            break;
          case "*":
            result = operand * Number(mainDisplay);
            break;
          case "/":
            result = operand / Number(mainDisplay);
            break;
          default:
            throw Error("Operator not found.");
        }
        text = result + " " + operator;
      } else {
        switch (operator) {
          case "+":
            text = auxiliaryDisplay.slice(0, -1) + "+";
            break;
          case "-":
            text = auxiliaryDisplay.slice(0, -1) + "-";
            break;
          case "*":
            text = auxiliaryDisplay.slice(0, -1) + "*";
            break;
          case "/":
            text = auxiliaryDisplay.slice(0, -1) + "/";
            break;
          default:
            throw Error("Operator not found.");
        }
      }
    }
    setAuxiliaryDisplay(text);
    setNumberWasClicked(false);
  }

  function evaluate() {
    let equation: string[];
    let result = 0;

    // FIX: Should allow evaluation when auxiliary display is empty
    if (auxiliaryDisplay.at(-1) == "=") {
      equation = auxiliaryDisplay.split(" ");
      equation[0] = mainDisplay;
    } else {
      equation = (
        auxiliaryDisplay +
        " " +
        mainDisplay +
        " ="
      ).split(" ");
    }

    switch (equation[1]) {
      case "+":
        result = Number(equation[0]) + Number(equation[2]);
        break;
      case "-":
        result = Number(equation[0]) - Number(equation[2]);
        break;
      case "*":
        result = Number(equation[0]) * Number(equation[2]);
        break;
      case "/":
        result = Number(equation[0]) / Number(equation[2]);
        break;
      default:
        throw Error("Operator not found.");
    }
    setAuxiliaryDisplay(equation.join(" "));
    setMainDisplay(String(result));
    setNumberWasClicked(false);
  }

  function switchSignal() {
    setMainDisplay(String(-1 * Number(mainDisplay)));
    setNumberWasClicked(false);
  }

  return (
    <div className="calculator">
      <Display
        mainDisplay={mainDisplay}
        auxiliaryDisplay={auxiliaryDisplay}
      />
      <div className="board">
        <div className="row">
          <button
            className="operators"
            type="button"
            onClick={() => setMainDisplay("0")}>
            CE
          </button>
          <button
            className="operators"
            type="button"
            onClick={clearDisplay}>
            C
          </button>
          <button
            className="operators"
            type="button"
            aria-label="delete"
            onClick={deleteLastDigit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512">
              <path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => computeOperator("/")}>
            /
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("7")}>
            7
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("8")}>
            8
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("9")}>
            9
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => computeOperator("*")}>
            *
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("4")}>
            4
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("5")}>
            5
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("6")}>
            6
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => computeOperator("-")}>
            -
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("1")}>
            1
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("2")}>
            2
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("3")}>
            3
          </button>
          <button
            className="operators"
            type="button"
            onClick={() => computeOperator("+")}>
            +
          </button>
        </div>

        <div className="row">
          <button
            className="numbers"
            type="button"
            onClick={
              // TODO: implement the signal button
              switchSignal
            }>
            +/-
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked("0")}>
            0
          </button>
          <button
            className="numbers"
            type="button"
            onClick={() => numberClicked(".")}>
            ,
          </button>
          <button
            className="equal"
            type="button"
            onClick={evaluate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
