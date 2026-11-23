import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Crearcuenta from './Paginas/Crearcuenta.jsx'
import OrganizerApp from './OrganizerApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrganizerApp />} />
        <Route path="/crear-cuenta" element={<OrganizerApp initialMode="signup" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
