import React from "react";
import Paper from "@mui/material/Paper";
import "./DetallesEspecies.css";

const DetalleEspecies = () => {
  return (
    <div id="body">
      <Paper elevation={3} id="detalle-especies-container">
        <h2>Detalle de las especies</h2>
        <div id="form-group">
          <input type="text" placeholder="Nombre científico (opcional)" />
          <input type="text" placeholder="Nombre común" />
          <input type="text" placeholder="Familia" />
          <input type="number" placeholder="Cantidad de muestras" />
          <input type="text" placeholder="Estado planta" />
          <button>Subir fotos</button>
        </div>
        <div id="button-group">
          <button>Atrás</button>
          <button>Guardar</button>
        </div>
      </Paper>
    </div>
  );
};


export default DetalleEspecies;
