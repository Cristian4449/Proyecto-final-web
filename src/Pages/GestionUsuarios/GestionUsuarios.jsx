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
  TablePagination,
} from "@mui/material";
import Swal from "sweetalert2";
import { getUsers, deleteUser, updateUser } from "../../services/userService";
import { getRoles } from "../../services/roleService";
import EditUserModal from "../../Components/EditarUsuario/EditarUsuario";
import { useNavigate } from "react-router-dom";
import "./GestionUsuarios.css";

const Users = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    roles: [],
    status: "",
  });
  const [isActionLoading, setIsActionLoading] = useState(false); // Estado de carga para acciones
  const [page, setPage] = useState(0); // Paginación: página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Paginación: filas por página

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

    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles(); // Devuelve un array de objetos
        setAvailableRoles(rolesData.map((role) => role.name)); // Extrae solo los nombres
      } catch (err) {
        console.error("Error obteniendo roles:", err);
      }
    };

    fetchUsuarios();
    fetchRoles();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email || "",
      roles: user.roles,
      status: user.status,
    });
    setOpenModal(true);
  };

  const handleDeleteUser = async (userId) => {
    setIsActionLoading(true);
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
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== userId)
        );
        Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      } finally {
        setIsActionLoading(false);
      }
    } else {
      setIsActionLoading(false);
    }
  };

  const handleCreateUser = () => {
    navigate("/registro", { replace: true });
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setFormData({
      username: "",
      email: "",
      roles: [],
      status: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = async () => {
    if (!formData.username.trim()) {
      Swal.fire("Error", "El nombre de usuario es obligatorio.", "error");
      return;
    }

    if (!formData.roles.length) {
      Swal.fire("Error", "Debe asignar al menos un rol al usuario.", "error");
      return;
    }

    try {
      const updatedUser = {
        username: formData.username,
        email: formData.email || null,
        roleNames: formData.roles,
        status: formData.status,
      };

      console.log("Datos enviados al backend:", updatedUser);

      await updateUser(selectedUser.id, updatedUser);

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === selectedUser.id
            ? { ...usuario, ...updatedUser }
            : usuario
        )
      );

      Swal.fire("Actualizado", "El usuario ha sido actualizado.", "success");
      handleModalClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar el usuario.", "error");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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

        

        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography id="titulo-tabla-users" variant="h4" component="h2">
            Gestión de Usuarios
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
        >
          <Button id="btn-1"
            variant="contained"
            color="primary"
            onClick={handleCreateUser}
          >
            Crear Usuario
          </Button>
        </Box>

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
              {usuarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.username}</TableCell>
                    <TableCell>{usuario.email || "N/A"}</TableCell>
                    <TableCell>{usuario.roles.join(", ")}</TableCell>
                    <TableCell>{usuario.status}</TableCell>
                    <TableCell>
                      <Button
                        id="btn-2"
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEditUser(usuario)}
                        sx={{ marginRight: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        id="btn-3"
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeleteUser(usuario.id)}
                        disabled={isActionLoading}
                      >
                        {isActionLoading ? (
                          <CircularProgress size={16} />
                        ) : (
                          "Eliminar"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <EditUserModal
        open={openModal}
        onClose={handleModalClose}
        formData={formData}
        onChange={handleInputChange}
        onSave={handleUpdateUser}
        availableRoles={availableRoles}
      />
    </Box>
  );
};

export default Users;
