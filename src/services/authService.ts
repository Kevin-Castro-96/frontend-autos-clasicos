import axios from "axios";

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
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en el registro");
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en el login");
  }
};
