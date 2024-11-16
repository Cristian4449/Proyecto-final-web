import React from 'react';
import './DetalleBitacora.css';

const DetalleBitacora = () => {
  return (
    <div className="detalle-bitacora-container">
      <div className='tituloh2'>
      <h2>Detalle Bitácora</h2>
      </div>
      <div className="detalle-bitacora-grid">
        <input type="text" placeholder="Título" className="detalle-bitacora-input" disabled/>
        <input type="text" placeholder="Fecha/Hora" className="detalle-bitacora-input" disabled/>
        <input type="text" placeholder="Coordenadas" className="detalle-bitacora-input" disabled/>
        <input type="text" placeholder="Condiciones climáticas" className="detalle-bitacora-input-large" disabled/>
        <button className="detalle-bitacora-button">Detalle de las especies</button>
        <textarea placeholder="Descripción del hábitat" className="detalle-bitacora-textarea" disabled></textarea>
        <button className="detalle-bitacora-button">Ver fotos</button>
        <button className="detalle-bitacora-button">Atrás</button>
      </div>
    </div>
  );
};

export default DetalleBitacora;
