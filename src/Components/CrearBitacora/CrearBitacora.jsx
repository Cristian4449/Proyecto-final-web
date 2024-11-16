import React, { useState, useEffect } from "react";
import "./CrearBitacora.css";

const CrearBitacora = () => {
  return (
    <>
      <div className="bitacora-container">
        <div id="titulo">
          <label>Crear Bitacora</label>
        </div>
        <div className="bitacora-row">
          <div className="inputBox">
            <h4>Título</h4>
            <input
              className="entradas"
              type="text"
              name=""
              placeholder="Ingrese un titulo"
              required
            />
          </div>
          <div className="inputBox">
            <h4>Fecha</h4>
            <input className="entradas" type="date" placeholder="Fecha/Hora" />
          </div>
          <div className="inputBox">
            <h4>Condiciones climáticas</h4>
            <textarea
              className="entradas"
              placeholder="Condiciones climáticas"
            />
          </div>
          <div className="inputBox">
            <h4>Coordenadas</h4>
            <input
              className="entradas"
              type="text"
              placeholder="xxxx, xxxx"
              value={""}
              onClick={() => alert("coordenadas")}
              readOnly
            />
          </div>
          <div className="inputBox">
            <h4>Descripción del hábitat</h4>
            <textarea
              className="entradas"
              placeholder="Descripción del hábitat"
            />
          </div>
          <div className="buttonBitacora">
            <button onClick={() => alert("Detalle de las especies")}>
              Detalle de las especies
            </button>
            <button onClick={() => alert("Subir Fotos")}>Subir fotos</button>
          </div>
          <button onClick={() => alert("Guardar")}>Guardar</button>
          <button onClick={() => alert("Cancelar")}>Cancelar</button>
        </div>
      </div>
    </>
  );
};

export default CrearBitacora;
