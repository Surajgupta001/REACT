import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    name: 'John',
    age: 30,
    occupation: 'Developer'
  }

  return (
    <>
    <h1 className = "bg-green-400 text-black p-4 rounded-xl mb-4">Tailwind Css</h1>
    <Card username="chaiaurcode" btnText = "click me"/>
    <Card username="suraj" btnText="visit me"/>
    </>
  )
}

export default App
