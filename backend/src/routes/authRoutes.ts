import { Router } from "express";
import authService from "../services/authService";
import authController from "../controllers/authController";
const authRoutes = Router();



const service = new authService();
const controller = new authController(service)

authRoutes.post("/register", controller.register);
authRoutes.post("/login", controller.login);

export default authRoutes;