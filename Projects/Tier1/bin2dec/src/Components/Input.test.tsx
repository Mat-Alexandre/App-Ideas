import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Input from './Input';
import React from 'react';

// User can enter up to 8 binary digits in one input field
// User must be notified if anything other than a 0 or 1 was entered
// User views the results in a single output field containing the decimal (base 10) equivalent of the binary number that was entered

describe(Input, () => {
    const setup = () => {
        // const maxAllowedDigits = 8;
        // const utils = render(<MockedInput />);
        const utils = render(<Input callback={jest.fn()} maxLength={8} />);
        const input = screen.getByRole('textbox');
        // const tooltip = await screen.findByRole("tooltip", {name: "Please insert only binary numbers (eg. 0, 1)."});
        return {
            input,
            // tooltip,
            ...utils,
        }
    }

    it("allows up to 8 digits in the input field", () => {
        const enteredValue = "101010101";
        const expectedValue = "10101010";
        const { input } = setup();
        
        act(()=>{
            userEvent.type(input, enteredValue);
        })
        expect(input.closest("input")).toHaveValue(expectedValue);
    });

    it("allows only binary digits", () => {
        const enteredValue = "01234567";
        const { input } = setup();
        
        act(()=>{
            userEvent.type(input, enteredValue);
        })
        expect(input.closest("input")).toHaveValue("01");
    });

    it("should render a <Tooltip/> when a non binary digit is entered.", async () => {
        const { input, getByText } = setup();
        const enteredValue = '2';

        act(() => {
            userEvent.type(input, enteredValue);
        });
        
        const tooltipElement = getByText("Please insert only binary numbers (eg. 0, 1).");
        expect(tooltipElement).toBeVisible();
    })
})