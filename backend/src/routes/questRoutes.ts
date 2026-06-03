import { Router } from "express";
import { QuestController } from "../controllers/questController";
import { QuestService } from "../services/questService";

const questRoutes = Router();

const questController = new QuestController(new QuestService());

questRoutes.get("/", questController.getAll);
questRoutes.get("/:id", questController.getById);
questRoutes.post("/", questController.create);
questRoutes.patch("/:id", questController.update);
questRoutes.delete("/:id", questController.delete);

export default questRoutes;
