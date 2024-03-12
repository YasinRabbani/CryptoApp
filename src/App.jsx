import { useState } from 'react'
import './App.css'
import PrimarySearchAppBar from './component/PrimarySearchAppBar'
import CoinList from './component/CoinList'  

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PrimarySearchAppBar />
      <CoinList />
    </>
  )
}

export default App
