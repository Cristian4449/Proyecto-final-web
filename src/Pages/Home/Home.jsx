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
import "./Home.css";


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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3}>
        {/* Header */}
        <AppBar id="home-header" position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">{user?.username || "Investigadores"}</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Toolbar>
        </AppBar>

        {/* Título */}
        <Box sx={{ textAlign: "center", marginTop: 8, marginBottom: 6 }}>
          <Typography id="titulo-tabla" variant="h4" component="h1" gutterBottom>
            Lista de Bitácoras
          </Typography>
        </Box>

        {/* Botones */}
        
        <Box sx={{ display: "flex", justifyContent: "right", gap: 2, marginBottom: 10, marginTop: 4 }}>
          <Button id="btn-1" variant="contained" color="primary" onClick={handleView}>
            lista de bitácoras
          </Button>
          <Button id="btn-1" variant="contained" onClick={handleCrearBitacora}>
            Crear Bitácora
          </Button>
          <Button id="btn-2" onClick={handleUsuarios} variant="outlined" color="secondary">
            Gestionar usuarios
          </Button>
        </Box>

        {/* Lista de Bitácoras */}
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


      </Paper>
    </Box>
  );
};

export default Home;
