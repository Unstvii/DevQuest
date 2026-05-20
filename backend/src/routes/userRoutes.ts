import { Router } from "express";
import userConteroller from "../controllers/userController";
import userService from "../services/userService";

const userRoutes = Router();

const services = new userService();
const controller = new userConteroller(services);

userRoutes.get("/", controller.getMe);

export default userRoutes;
