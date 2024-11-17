import axios from "axios";

export const getRoles = async () => {
  try {
    const response = await axios.get("/api/roles");
    console.log("Roles:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo roles:", error);
    throw error;
  }
};

export const getRole = async (roleId) => {
  try {
    const response = await axios.get(`/api/roles/${roleId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo rol:", error);
    throw error;
  }
};

export const createRole = async (role) => {
  try {
    const response = await axios.post("/api/roles", role);
    return response.data;
  } catch (error) {
    console.error("Error creando rol:", error);
    throw error;
  }
};

export const updateRole = async (roleId, role) => {
  try {
    const response = await axios.put(`/api/roles/${roleId}`, role);
    return response.data;
  } catch (error) {
    console.error("Error actualizando rol:", error);
    throw error;
  }
};

export const deleteRole = async (roleId) => {
  try {
    const response = await axios.delete(`/api/roles/${roleId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando rol:", error);
    throw error;
  }
};