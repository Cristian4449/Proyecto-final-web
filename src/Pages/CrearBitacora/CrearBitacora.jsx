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
import "leaflet/dist/leaflet.css";
import useUserStore from "../../store/state/useUserStore";

const CrearBitacora = () => {
  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({
    titulo: "",
    fechaMuestreo: "",
    condicionesClimaticas: "",
    localizacion: { latitud: "", longitud: "" },
    descripcionHabitat: "",
    creadoPor: user.id
  });

  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "latitud" || name === "longitud") {
      setFormData({
        ...formData,
        localizacion: {
          ...formData.localizacion,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validar que las coordenadas sean válidas
    const { latitud, longitud } = formData.localizacion;
    if (!latitud || !longitud || isNaN(latitud) || isNaN(longitud)) {
      Swal.fire("Error", "Las coordenadas deben ser números válidos.", "error");
      setLoading(false);
      return;
    }

    if (!formData.creadoPor) {
      Swal.fire("Error", "Debe especificar el ID del creador.", "error");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        localizacion: {
          latitud: parseFloat(latitud),
          longitud: parseFloat(longitud),
        },
      };

      await createBitacora(payload);
      Swal.fire("Éxito", "Bitácora creada exitosamente.", "success");

      // Reiniciar el formulario
      setFormData({
        titulo: "",
        fechaMuestreo: "",
        condicionesClimaticas: "",
        localizacion: { latitud: "", longitud: "" },
        descripcionHabitat: "",
        creadoPor: "",
      });
      setMarkerPosition([51.505, -0.09]); // Reiniciar marcador en el mapa
    } catch (error) {
      const errorMessage = error.response?.data?.message || "No se pudo crear la bitácora. Inténtalo nuevamente.";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    setFormData({
      ...formData,
      localizacion: { latitud: lat, longitud: lng },
    });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h4">Crear Bitácora</Typography>
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
          label="Fecha de Muestreo"
          name="fechaMuestreo"
          type="date"
          value={formData.fechaMuestreo}
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">Localización</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Latitud"
              name="latitud"
              value={formData.localizacion.latitud}
              onChange={handleChange}
              placeholder="Latitud"
              fullWidth
            />
            <TextField
              label="Longitud"
              name="longitud"
              value={formData.localizacion.longitud}
              onChange={handleChange}
              placeholder="Longitud"
              fullWidth
            />
          </Box>
          <Box
            sx={{
              height: "400px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <MapContainer
              center={markerPosition}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={markerPosition} />
              <MapClickHandler />
            </MapContainer>
          </Box>
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
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Guardar"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setFormData({})}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CrearBitacora;
