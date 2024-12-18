import {
    Box,
    Typography,
    Modal,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  import PropTypes from "prop-types";
  import "./EditarUsuario.css";
  
  const EditUserModal = ({ open, onClose, formData, onChange, onSave, availableRoles }) => {
    const handleRoleChange = (event) => {
      onChange({
        target: { name: "roles", value: event.target.value },
      });
    };
  
    return (
      <Modal id="modal-edit-user" open={open} onClose={onClose}>
        <Box id="titulo-modal"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Editar Usuario
          </Typography>
          <TextField
            label="Nombre"
            name="username"
            value={formData.username}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Roles</InputLabel>
            <Select
              multiple
              name="roles"
              value={formData.roles}
              onChange={handleRoleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {availableRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Estado"
            name="status"
            value={formData.status}
            onChange={onChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button id="btn-2" variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button id="btn-1" variant="contained" onClick={onSave}>
              Guardar Cambios
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  EditUserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    availableRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  
  export default EditUserModal;
  