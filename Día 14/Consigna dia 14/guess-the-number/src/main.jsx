import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Los estilos globales van primero para que los de cada componente puedan sobrescribirlos.
import './styles/variables.css';
import './styles/base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
