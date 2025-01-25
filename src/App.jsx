import { useState } from 'react'
import './App.css'
import AddRoom from './components/room/AddRoom'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddRoom/>
    </>
  )
}

export default App
