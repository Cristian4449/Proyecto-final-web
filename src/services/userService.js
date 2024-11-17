import axios from "axios";

export const createUser = async (user) => {
  try {
    const response = await axios.post("/api/user/create", user);
    return response.data;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get("/api/user");
    console.log("Usuarios:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
};

export const updateUser = async (userId, user) => {
  try {
    const response = await axios.put(`/api/user/${userId}`, user);
    return response.data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw error;
  }
};
