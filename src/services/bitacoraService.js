import axios from "axios";

export const getBitacoras = async () => {
  try {
    const response = await axios.get("/api/bitacora");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo bitacoras:", error);
    throw error;
  }
};

export const getBitacora = async (bitacoraId) => {
  try {
    const response = await axios.get(`/api/bitacora/${bitacoraId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo bitacora:", error);
    throw error;
  }
};

export const createBitacora = async (bitacora) => {
  try {
    const response = await axios.post("/api/bitacora", bitacora);
    return response.data;
  } catch (error) {
    console.error("Error creando bitacora:", error);
    throw error;
  }
};

export const updateBitacora = async (bitacoraId, bitacora) => {
  try {
    const response = await axios.put(`/api/bitacora/${bitacoraId}`, bitacora);
    return response.data;
  } catch (error) {
    console.error("Error actualizando bitacora:", error);
    throw error;
  }
};

export const deleteBitacora = async (bitacoraId) => {
  try {
    const response = await axios.delete(`/api/bitacora/${bitacoraId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando bitacora:", error);
    throw error;
  }
};