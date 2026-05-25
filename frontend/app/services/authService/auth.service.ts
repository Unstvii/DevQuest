import api from "./axios";
import { LoginFormData, RegisterFormData } from "@/utils/shemas";

export const authService = {
  login: (userData: LoginFormData) => {
    return api.post("/auth/login", userData);
  },
  register: (userData: RegisterFormData) => {
    return api.post("/auth/register", userData);
  },
};
