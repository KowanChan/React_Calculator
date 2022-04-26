// Import either backend.js or backend2.js for computation. Both do same thing, just differently
import { useState } from 'react';
import { evaluate } from './backend.js';

// This app assumes that the user does not enter leading 0s, and enters a 0 before a decimal
function App() {
  // calc and result are both strings representing the string of commands to be done
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["+","-","/","*","."];

  // This updates the value of the calculator with the new value. If the item entered was an op, do not update the result. 
  // Update the display of the calculator.
  const updateCalc = value =>{
    if(
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
      )
    {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) 
    {
      setResult(evaluate(calc + value).toString());
    }
  }

  // Evaluate the equation using proper order of operations. backend.js and backend2.js are different implementations
  const calculate = () => {
    setCalc(evaluate(calc));
  }

  // Delete the last entered value, op or num
  const deleteLast = () => {
    if(calc == ''){
      return;
    }

    const value = String(calc).slice(0, -1);
    setCalc(value);
    setResult(value);
  }

  // Creates the digit buttons dynamically
  const createDigits = () => {
    const digits = [];

    for (let i= 1; i<10; i++) {
      digits.push(<button key={i} onClick = {() => updateCalc(i.toString())} >{i}</button>)
    }
    return digits;
  }

  // Creates the operator bottons dynamically
  const createOps = () => {
    const opsButt = [];

    for (let i = 0; i<4; i++) {
      opsButt.push(<button key = {ops[i]} onClick = {() => updateCalc(ops[i])}>{ops[i]}</button>)
    }

    opsButt.push(<button onClick = {deleteLast} key = {"DEL"}>{"DEL"}</button>)
    return opsButt;
  }

  // This returns the calculator app.
  return (
    <div className="App">
      <div className = "CalcDiv">
        <div className = "display">
          {result ? <span>{result}</span> : ''} 
          {calc || "0"}
        </div>

        <div className = "ops">
            {createOps()}
        </div>

        <div className = "dig">
          {createDigits()}
          <button onClick = {() => updateCalc("0")}>0</button>
          <button onClick = {() => updateCalc(".")}>.</button>
          <button onClick = {calculate} className="equalOps">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;