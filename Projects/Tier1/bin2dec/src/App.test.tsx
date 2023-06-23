import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';
import React from 'react';

describe(App, () => {
  it("should render a title", () => {
    const { getByRole } = render(<App />);
    const value = getByRole("heading", { name: "Binary to Decimal" }).textContent;
    
    expect(value).toEqual("Binary to Decimal");
  });

  it("should render a description", () => {
    const text = "Enter the 8-digit binary number to convert.";
    // const { getByText } = render(<App />);
    // const value = getByText(text).textContent;

    render(<App />);
    const value = screen.getByText(text).textContent;
    
    expect(value).toEqual(text);
  });

  it("should render a <Input/> component", () => {
    const { getByRole } = render(<App />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should convert a binary number to its decimal and render the result", () => {
    const binaryInput = 1010;
    const decimalOutput = 10;
    
    render(<App />);
    const inputElement = screen.getByRole('textbox')

    act(()=>{
      userEvent.type(inputElement, String(binaryInput));
    })

    const headingElement = screen.getByRole("heading", { name: String(decimalOutput) });
    const value = Number(headingElement.textContent);

    expect(headingElement).toBeInTheDocument();
    expect(value).toEqual(decimalOutput);
  });
})