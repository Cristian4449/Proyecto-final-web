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
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createUser } from "../../services/userService";
import { getRoles } from "../../services/roleService";
import logo from "../../assets/ingSis.png";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roleNames: "",
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const navigate = useNavigate();

  // Cargar roles desde la API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        setError(
          error.message ||
            "Error cargando roles. Por favor, inténtalo más tarde."
        );
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createUser(formData);
      Swal.fire({
        icon: "success",
        title: "Usuario creado exitosamente",
        text: "Ahora puedes iniciar sesión.",
        confirmButtonText: "Ir al login",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error creando usuario");
    }
  };

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
            Crear usuario
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
              {loadingRoles ? (
                <CircularProgress size={24} />
              ) : (
                <Select
                  labelId="rol-label"
                  name="roleNames"
                  value={formData.roleNames}
                  onChange={handleChange}
                  label="Elegir rol"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              href="/"
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
