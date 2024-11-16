import React from "react";
import "./Login.css";
import Paper from "@mui/material/Paper";
import logo from '../../assets/ingSis.png';

function Login() {
  return (
    <div id="body">
      <Paper square elevation={3} id='paper-root'>
        <div className="login-container">
          <div className="login-box">
            <img src={logo} alt="Logo Ingeniería de Sistemas" className="logo" />
            <h2>
              PROYECTO FINAL
              <br />
              PROGRAMACIÓN WEB G2
            </h2>
            <form>
              <input type="email" placeholder="Correo" required />
              <input type="password" placeholder="Contraseña" required />
              <button type="submit">Iniciar Sesión</button>
              <button type="button">Registrarse</button>
              <a href="#" className="forgot-password">
                ¿Olvidó su contraseña?
              </a>
            </form>
            
          </div>
          <div id="footer">
              <p>
                Copyright © 2024 Universidad de la Amazonia
                <br />
                Ingeniería de Sistemas
                <br />
                Programación Web Grupo 2.
              </p>
            </div>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
