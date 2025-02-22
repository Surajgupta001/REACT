// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  // const [count, setCount] = useState(0)
  // let myObj = {
  //   name: 'John',
  //   age: 30,
  //   occupation: 'Developer'
  // }
  // let newArray = [1,2,3];

  return (
    <>
    <h1 className='bg-green-400 text-black p-4 rounded-xl'>Tailwind test</h1>
    {/* <Card channel="chai aur code" someObje = {myObj}/> */}
    <Card username = "chaiaurcode"/>
    <Card username = "suraj"/>
    </>
  )
}

export default App
