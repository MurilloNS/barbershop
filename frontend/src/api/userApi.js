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
