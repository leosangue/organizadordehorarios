import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Crearcuenta from './Paginas/Crearcuenta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/crear-cuenta" element={<Crearcuenta />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
