import { useState } from 'react';
import './App.css'

function App() {

  const [counter, setCounter] = useState(15)

  // let counter = 15;
  const addValue = () => {
    // counter += 1;
    setCounter(counter + 1);
    console.log("Value Added", counter);
    console.log("Value Added", Math.random());
  }

  const removeValue = () => {
    setCounter(counter-1);
  }

  return (
    <>
    <h1>chai aur react</h1>
    <h2>counter value: {counter}</h2>
    <button onClick={addValue}>Add Value</button>
    <br />
    <button onClick={removeValue}>Remove value {counter}</button>
    <footer>footer: {counter}</footer>
    </>
  )
}

export default App
