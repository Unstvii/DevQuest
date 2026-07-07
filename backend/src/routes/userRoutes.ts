import { Router } from "express";
import userController from "../controllers/userController";
import userService from "../services/userService";

const userRoutes = Router();

const services = new userService();
const controller = new userController(services);

userRoutes.get("/", controller.getMe);

export default userRoutes;
