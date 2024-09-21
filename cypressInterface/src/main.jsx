import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa el componente principal App
import './index.css'; // Opcional, para agregar tus estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
