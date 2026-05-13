import { Router } from "express";
import authService from "../services/authService";
import authController from "../controllers/authController";
const authRoutes = Router();



const service = new authService();
const controller = new authController(service)

authRoutes.post("/", controller.register);


export default authRoutes;