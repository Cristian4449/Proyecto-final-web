import axios from "axios";

export const login = async (user) => {
  try {
    const response = await axios.post("/api/auth/login", user);
    console.log("Login:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error cerrando sesión:", error);
    throw error;
  }
};