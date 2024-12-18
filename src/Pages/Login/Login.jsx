import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../services/authService";
import logo from "../../assets/ingSis.png";
import useUserStore from "../../store/state/useUserStore";
import "./Login.css";



function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Extrae la función `loginUser` del store de Zustand
  const loginUser = useUserStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login(formData);
      loginUser(response.user, response.token);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: `Bienvenido, ${response.user.username}!`,
      });
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Error iniciando sesión');
    }
  };

  const handleRegistro = () => {
    navigate("/registro", { replace: true });
  };

  return (
    
    <Container id="body" maxWidth="sm" >
      <Paper id="paper-root" elevation={3} sx={{ padding: 4, textAlign: "center", borderRadius: 2}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo Ingeniería de Sistemas"
            style={{ width: 180, marginBottom: 16 }}
          />
          <Typography id="tipografia" variant="h4" component="h2" gutterBottom>
            Iniciar Sesión
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              marginTop: 3,
            }}
          >
            <TextField
              type="text"
              name="username"
              label="Usuario"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              type="password"
              name="password"
              label="Contraseña"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#4caf50",
                color: "#fff",
                marginTop: 2,
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              Iniciar Sesión
            </Button>
            
          </Box>
          <Box sx={{ marginTop: 2}}>
          <Typography variant="body2">
            ¿Aún no tienes cuenta? {" "}
            <Button
              onClick={handleRegistro}
              sx={{
                cursor: "pointer",
                color: "#29A749",
                textTransform: "none",
                padding: 0,
                "&:hover": { textDecoration: "underline" },
                backgroundColor: "transparent",
              }}
            >
              Regístrate
            </Button>
          </Typography>
            </Box>
        </Box>
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Copyright © 2024 Universidad de la Amazonia
            <br />
            Ingeniería de Sistemas
            <br />
            Programación Web Grupo 2.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
