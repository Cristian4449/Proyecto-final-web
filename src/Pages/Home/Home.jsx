import {
  Paper,
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AppBar,
  Toolbar,
} from "@mui/material";
import useUserStore from "../../store/state/useUserStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const bitacoras = [
    { id: 1, nombre: "Bitácora 1", fecha: "2024-01-01" },
    { id: 2, nombre: "Bitácora 2", fecha: "2024-02-01" },
  ];

  const handleView = () => {
    console.log("Navegando a la nueva vista");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleUsuarios = () => {
    navigate("/usuarios");
  };

  const handleCrearBitacora = () => {
    navigate("/crear-bitacora"); // Navega al componente CrearBitacora
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3}>
        {/* Header */}
        <AppBar position="static" color="primary">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
            <Typography variant="h6">{user?.username || "Investigadores"}</Typography>
          </Toolbar>
        </AppBar>

        {/* Título */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Home
          </Typography>
        </Box>

        {/* Botones */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 4 }}>
          <Button variant="contained" color="primary" onClick={handleCrearBitacora}>
            Crear Bitácora
          </Button>
          <Button onClick={handleUsuarios} variant="outlined" color="secondary">
            Gestionar usuarios
          </Button>
        </Box>

        {/* Lista de Bitácoras */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Lista de Bitácoras
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bitacoras.map((bitacora) => (
                  <TableRow key={bitacora.id}>
                    <TableCell>{bitacora.id}</TableCell>
                    <TableCell>{bitacora.nombre}</TableCell>
                    <TableCell>{bitacora.fecha}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Botón para lista de bitácoras */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Button variant="contained" color="primary" onClick={handleView}>
            Ir a la lista de bitácoras
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
