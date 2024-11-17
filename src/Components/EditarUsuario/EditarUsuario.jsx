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
  
  const EditUserModal = ({ open, onClose, formData, onChange, onSave, availableRoles }) => {
    const handleRoleChange = (event) => {
      onChange({
        target: { name: "roles", value: event.target.value },
      });
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
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
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
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
  