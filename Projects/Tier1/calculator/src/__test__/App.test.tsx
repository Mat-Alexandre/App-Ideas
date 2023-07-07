import { beforeEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import {
  screen,
  render,
  fireEvent,
} from "@testing-library/react";

import App from "../App";

// User can see a display showing the current number entered or the result of the last operation.
// User can see an entry pad containing buttons for the digits 0-9, operations - '+', '-', '/', and '=', a 'C' button (for clear), and an 'AC' button (for clear all).
// User can enter numbers as sequences up to 8 digits long by clicking on digits in the entry pad. Entry of any digits more than 8 will be ignored.

beforeEach(() => {
  render(<App />);
});

describe("App Layout", () => {
  it("renders the display correctly showing current input/result", () => {
    // watch out for <h1> and <h2>
    const headingElements = screen.getAllByRole("heading");

    expect(headingElements.length).toEqual(2);
  });

  it("renders all the digits, operators and buttons", () => {
    const numButtonsInPad = 20;
    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toEqual(numButtonsInPad);
  });
});

describe("Click Events", () => {
  it("should allow numbers up to 8 digits", () => {
    const TIMES_TO_REPEAT = 10;
    for (let i = 0; i < TIMES_TO_REPEAT; i++)
      fireEvent.click(
        screen.getByRole("button", { name: "1" })
      );

    const headingElement = screen.getByRole("heading", {
      name: "11111111",
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should allow a simple equation [1+2*3]", () => {
    fireEvent.click(
      screen.getByRole("button", { name: "1" })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "+" })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "2" })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "*" })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "3" })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "=" })
    );

    // The input display is rendered below the output one
    const displayElement = screen.getAllByRole("heading");
    expect(displayElement[0].textContent).toEqual(
      "3 * 3 ="
    );
    expect(displayElement[1].textContent).toEqual("9");
  });

  it("should allow a long equation [11111111+22222222+33333333]", () => {
    const TIMES_TO_REPEAT = 8;

    const plusButton = screen.getByRole("button", {
      name: "+",
    });
    for (let i = 0; i < TIMES_TO_REPEAT; i++)
      fireEvent.click(
        screen.getByRole("button", { name: "1" })
      );
    fireEvent.click(plusButton);
    for (let i = 0; i < TIMES_TO_REPEAT; i++)
      fireEvent.click(
        screen.getByRole("button", { name: "2" })
      );
    fireEvent.click(plusButton);
    for (let i = 0; i < TIMES_TO_REPEAT; i++)
      fireEvent.click(
        screen.getByRole("button", { name: "3" })
      );

    const headingElement =
      screen.getAllByRole("heading")[1];
    expect(headingElement.textContent).toEqual("33333333");
  });

  it("should clear all the input", () => {
    const buttonOne = screen.getByRole("button", {
      name: "1",
    });
    const buttonCE = screen.getByRole("button", {
      name: "CE",
    });
    for (let i = 0; i < 3; i++) fireEvent.click(buttonOne);
    fireEvent.click(buttonCE);

    const headingElement =
      screen.getAllByRole("heading")[1];
    expect(headingElement.textContent).toEqual("0");
  });

  it("should clear the last typed digit", () => {
    const buttonOne = screen.getByRole("button", {
      name: "1",
    });
    const buttonDelete = screen.getByLabelText("delete");
    for (let i = 0; i < 3; i++) fireEvent.click(buttonOne);
    fireEvent.click(buttonDelete);

    const headingElement =
      screen.getAllByRole("heading")[1];
    expect(headingElement.textContent).toEqual("11");
  });

  it("should clear the last typed operator", () => {
    const buttonOne = screen.getByRole("button", {
      name: "1",
    });
    const buttonPlus = screen.getByRole("button", {
      name: "+",
    });
    const buttonMinus = screen.getByRole("button", {
      name: "-",
    });
    const buttonCE = screen.getByRole("button", {
      name: "CE",
    });

    fireEvent.click(buttonOne);
    fireEvent.click(buttonPlus);
    fireEvent.click(buttonCE);
    fireEvent.click(buttonMinus);
    fireEvent.click(buttonOne);

    const auxiliaryDisplay =
      screen.getAllByRole("heading")[0];
    const mainDisplay = screen.getAllByRole("heading")[1];

    expect(auxiliaryDisplay.textContent).toEqual("1 -");
    expect(mainDisplay.textContent).toEqual("1");
  });
});
