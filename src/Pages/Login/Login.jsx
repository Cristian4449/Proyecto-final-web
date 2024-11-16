import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/ingSis.png";

function Login() {
  return (
    <Container id="body" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
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
            style={{ width: 100, marginBottom: 16 }}
          />
          <Typography variant="h4" component="h2" gutterBottom>
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              type="email"
              label="Correo"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              type="password"
              label="Contraseña"
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Iniciar Sesión
            </Button>
            <Button
              component={Link}
              to="/registro"
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Registrarse
            </Button>
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
