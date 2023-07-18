import React from 'react'
import Canvas from '../src/canvas/Canvas.jsx'
import Home from '../src/pages/Home.jsx'
import Customizer from '../src/pages/Customizer.jsx'
import './index.css'

const App = () => {
  return (
    <main className='app-transition-all ease-in'>
      <Home />
      <Canvas />
      <Customizer />


    </main>
  )
}

export default App
