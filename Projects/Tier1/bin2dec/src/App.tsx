import React, { useEffect, useState } from 'react';
import './App.css';
import Input from './Components/Input';

function App() {
  const [ result, setResult ] = useState('');
  const [ inputValue, setInputValue ] = useState('');

  const bin2dec = (binary: string): number => {
    // Converts a binary number to a decil
    let res = 0;
    for(let i = binary.length - 1; i >= 0; i--){
      res += parseInt(binary[i]) * Math.pow(2, binary.length-1-i);
    }
    return res;
  }

  useEffect(() => {
    // Update the H2 element every single time the input is changed.
    const decimalResult = bin2dec(inputValue);
    setResult(String(decimalResult));
  }, [inputValue])

  return (
    <>
      <h1>Binary to Decimal</h1>
      <p>Enter the 8-digit binary number to convert.</p>
      <div className='input-container'>
        <Input maxLength={8} callback={(inputValue) => setInputValue(inputValue)}/>
      </div>
      <h2>{result}</h2>
    </>
  );
}

export default App;
