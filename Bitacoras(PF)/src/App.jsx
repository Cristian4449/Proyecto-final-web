import { useState } from 'react'
import './App.css'
import DetalleEspecies from  './Components/DetallesEspecies/DetallesEspecies'
import Home from './Pages/Home/Home'
import CrearBitacora from "./Components/CrearBitacora/CrearBitacora"
import Register from "./Components/Register/Register"
import ListaBitacoras from './Components/ListaBitacora/ListaBitacora'
import DetalleBitacora from './Components/DetalleBitacora/DetalleBitacora'

function App() {

  return (
    <>
      <div className="App">
        <DetalleBitacora/>
      </div>
    </>
  )
}

export default App
