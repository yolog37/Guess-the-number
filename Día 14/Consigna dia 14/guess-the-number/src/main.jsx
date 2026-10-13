import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


//Funcionamiento: Toma el componente principal <App/> y lo monta dentro del elemento HTML con el ID root que se encuentra en tu archivo index.html. También envuelve la app en herramientas estándar como React.StrictMode para detectar posibles errores de desarrollo.