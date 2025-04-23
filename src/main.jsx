import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Aqui é onde Tailwind entra em ação!
import SimuladorDeTaxas from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimuladorDeTaxas />
  </React.StrictMode>
);
