import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { getUsers, deleteUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener usuarios desde el servicio
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsers();
        setUsuarios(data);
      } catch (err) {
        setError("Error obteniendo usuarios. Intenta nuevamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Confirmar eliminación con SweetAlert
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteUser(userId);
        // Eliminar usuario del estado local
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== userId)
        );
        Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  const handleCreateUser = () => {
    navigate("/", { replace: true });
  };

  const handleEditUser = (userId) => {
    console.log(`Editando usuario con ID: ${userId}`);
  };

  const handleBack = () => {
    console.log("Navegando hacia atrás");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* Título */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography variant="h4" component="h2">
            Gestión de Usuarios
          </Typography>
        </Box>

        {/* Botón para crear usuario */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCreateUser}>
            Crear Usuario
          </Button>
        </Box>

        {/* Tabla de usuarios */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.username}</TableCell>
                  <TableCell>{usuario.email || "N/A"}</TableCell>
                  <TableCell>{usuario.roles.join(", ")}</TableCell>
                  <TableCell>{usuario.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEditUser(usuario.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleDeleteUser(usuario.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Botón para regresar */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Button variant="outlined" onClick={handleBack}>
            Atrás
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Users;
