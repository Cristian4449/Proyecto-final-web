import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { createBitacora } from "../../services/bitacoraService";


const CrearBitacora = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    condicionesClimaticas: "",
    coordenadas: "",
    descripcionHabitat: "",
  });

  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]); // Coordenadas iniciales
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBitacora({
        ...formData,
        coordenadas: `${markerPosition[0]}, ${markerPosition[1]}`,
      });
      Swal.fire("Éxito", "Bitácora creada exitosamente.", "success");
      setFormData({
        titulo: "",
        fecha: "",
        condicionesClimaticas: "",
        coordenadas: "",
        descripcionHabitat: "",
      });
    } catch (error) {
      Swal.fire(error.response?.data?.message || "Error", "No se pudo crear la bitácora. Inténtalo nuevamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se perderán los datos ingresados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          titulo: "",
          fecha: "",
          condicionesClimaticas: "",
          coordenadas: "",
          descripcionHabitat: "",
        });
      }
    });
  };

  // Componente para manejar clics en el mapa y actualizar el marcador
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography  
        variant="h4"
        color={"#444445;"}
        fontSize={35}
        fontWeight={500}
        fontFamily={"Poppins"}
        marginBottom={10}
        marginTop={8}
    
        >Crear Bitácora</Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ingrese un título"
          fullWidth
          required
        />
        <TextField
          label="Fecha"
          name="fecha"
          type="date"
          value={formData.fecha}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />
        <TextareaAutosize
          minRows={4}
          name="condicionesClimaticas"
          value={formData.condicionesClimaticas}
          onChange={handleChange}
          placeholder="Condiciones climáticas"
          style={{ width: "100%", padding: "8px" }}
        />
        <Box>
          <Typography 
          color={"#444445;"}
          fontSize={20}
          fontWeight={500}
          fontFamily={"Poppins"}
          variant="h5" 
          marginBottom={6}
          marginTop={4}
          gutterBottom>
            Seleccione Coordenadas
          </Typography>
          <MapContainer
            center={markerPosition}
            
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerPosition} />
            <MapClickHandler />
          </MapContainer>
          <TextField
            label="Coordenadas"
            name="coordenadas"
            value={`${markerPosition[0]}, ${markerPosition[1]}`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
        </Box>
        <TextareaAutosize
          minRows={4}
          name="descripcionHabitat"
          value={formData.descripcionHabitat}
          onChange={handleChange}
          placeholder="Descripción del hábitat"
          style={{ width: "100%", padding: "8px" }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button id="btn-1" variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Guardar"}
          </Button>
          <Button id="btn-2" variant="outlined" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CrearBitacora;
