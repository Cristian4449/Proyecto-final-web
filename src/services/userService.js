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