import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { createUser } from "../../services/userService";
import logo from "../../assets/ingSis.png";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roleNames: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createUser(formData);
      setSuccess(true);
      setFormData({ username: "", password: "", roleNames: "" }); // Limpia el formulario
    } catch (err) {
      setError(err.response?.data?.message || "Error creando usuario");
    }
  };

  return (
    <Container id="body" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={logo} alt="Logo Ingeniería de Sistemas" style={{ width: 100, marginBottom: 16 }} />
          <Typography variant="h4" component="h2" gutterBottom>
            Crear usuario
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Usuario creado exitosamente</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
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
            <FormControl fullWidth required>
              <InputLabel id="rol-label">Elegir rol</InputLabel>
              <Select
                labelId="rol-label"
                name="roleNames"
                value={formData.roleNames}
                onChange={handleChange}
                label="Elegir rol"
              >
                <MenuItem value="Investigador">Investigador</MenuItem>
                <MenuItem value="Colaborador">Colaborador</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              href="/login"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
