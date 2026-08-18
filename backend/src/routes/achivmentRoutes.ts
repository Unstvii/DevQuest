import { Router } from "express";
import achivmentController from "../controllers/achivmentController";
import achivmentService from "../services/achivmentService";

const achivmentRoutes = Router();

const service = new achivmentService();
const achievement = new achivmentController(service);

achivmentRoutes.get("/", achievement.getAllAchivments);

export default achivmentRoutes;
