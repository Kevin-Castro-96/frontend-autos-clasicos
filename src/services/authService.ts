import axios, { AxiosError } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Error en el registro";
      throw new Error(message);
    }
    throw new Error("Error desconocido en el registro");
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Error en el login";
      throw new Error(message);
    }
    throw new Error("Error desconocido en el login");
  }
};
