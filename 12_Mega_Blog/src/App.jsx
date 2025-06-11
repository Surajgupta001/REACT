import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("App.jsx: useEffect triggered");
    authService.getCurrentUser()
    .then((userData) => {
      console.log("App.jsx: getCurrentUser success. UserData:", userData);
      if (userData) {
        dispatch(login({userData}))
        console.log("App.jsx: User logged in, dispatched login action.");
      } else {
        dispatch(logout())
        console.log("App.jsx: No user data, dispatched logout action.");
      }
    })
    .catch(error => {
      console.error("App.jsx: Error in getCurrentUser:", error);
      // Potentially dispatch logout or set an error state here too
      dispatch(logout());
    })
    .finally(() => {
      console.log("App.jsx: getCurrentUser finally block. Setting loading to false.");
      setLoading(false)
    })
  }, [dispatch])
  
  return !loading ? (
    <div className='flex flex-wrap content-between min-h-screen bg-gray-400'>
      <div className='block w-full'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
