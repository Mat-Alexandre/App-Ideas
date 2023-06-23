import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Input.css'

interface InputInterface {
    maxLength: number,
    callback?(inputValue: string): void
}

function Input(props: InputInterface) {
    const tooltipText = "Please insert only binary numbers (eg. 0, 1).";
    const [ value, setValue ] = useState<string>('');
    const [ enabled, setEnabled ] = useState(false);
    const allowsOnlyBinary = (event: React.ChangeEvent<HTMLInputElement>) => {
        // It receives the onChange event and filter out all non binary digits;
        const re = /^[01]+$/;
        
        if(!re.test(event.target.value) && event.target.value !== '') {
            setEnabled(true);
        }else {
            setEnabled(false);
            setValue(event.target.value)
            if(props.callback !== undefined) props.callback(event.target.value)
        }
    }

    return (
        <Tippy visible={enabled} content={tooltipText}>
            <input
                value={value}
                onChange={allowsOnlyBinary}
                type="text" 
                maxLength={props.maxLength}
            />
        </Tippy>
    );
}

export default Input;