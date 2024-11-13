import api from "./axios";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    if (response.status === 201) {
      return response;
    }

    throw new Error(response.data.message || "Erro ao registrar.");
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/users/login", loginData);
    if (response.status === 200) {
      return response;
    }

    throw new Error(response.data.message || "Erro ao fazer login.");
  } catch (error) {
    throw error;
  }
};
