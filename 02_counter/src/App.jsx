import { useState } from 'react'
import './App.css'

function App() {

  /* hooks in React */

  //     variable, function
  let [counter, setCounter] = useState(15)
  // let counter = 15;
  const addValue = () => {
    // console.log("Clicked", counter);
    // setCounter(counter + 1);

    // ========== 1st Approch ==========
    if(counter < 30){
      setCounter(counter + 1);
    }
    else{
      alert("Counter is already at max value");
    }
    /* 
    ============ 2nd Approch ===============
    console.log("Clicked", counter);
    setCounter(Math.min(counter + 1, 20));
    */ 
  }

  const RemoveValue = () => {
    // console.log("Clicked", counter);
    // setCounter(counter - 1); 

    // ============= 1st Approch ===========
    if(counter > 0){
      setCounter(counter - 1);
    }
    else{
      alert("Counter is already at min value");
    }

    /*
    =========== 2nd Approch =============
    console.log("Clicked", counter);
    setCounter(Math.max(counter - 1, 0));
    */ 
  }

  return (
    <>
    <h1>chai aur code</h1>
    <h2>counter value: {counter}</h2>
    <button onClick = {addValue} >Add Value{counter}</button>
    <br></br>
    <button onClick = {RemoveValue} >Remove Value{counter}</button>
    <p>footer : {counter}</p>
    </>
  )
}
export default App