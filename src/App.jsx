import { useState } from 'react'
import './App.css'
import AddRoom from './components/room/AddRoom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ExistingRooms from './components/room/ExistingRooms';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddRoom/>
      <ExistingRooms/>
    </>
  )
}

export default App
