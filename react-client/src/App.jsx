import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  //display the login page and the user page
  return (
    <div className="App">
      <header className="App-header">
        <Outlet />
      </header>
    </div>
  )
}

export default App
