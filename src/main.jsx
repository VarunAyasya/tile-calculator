import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TileInputsContextProvider from './context/TileInputsContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TileInputsContextProvider>
      <App />
    </TileInputsContextProvider>

  </StrictMode>,
)
