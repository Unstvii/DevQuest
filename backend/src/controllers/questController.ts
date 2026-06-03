import { Request, Response } from "express";
import { QuestService } from "../services/questService";

export class QuestController {
  private questService: QuestService;

  constructor(questService: QuestService) {
    this.questService = questService;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const quests = await this.questService.getAll();
      res.json(quests);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const quest = await this.questService.getById(id);

      if (!quest) {
        res.status(404).json({ message: "Quest not found" });
        return;
      }

      res.json(quest);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const quest = await this.questService.create(req.user!.id, req.body);
      res.status(201).json(quest);
    } catch (error) {
      console.error("CREATE ERROR:", error);
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  };
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const quest = await this.questService.update(id, req.body);

      if (!quest) {
        res.status(404).json({ message: "Quest not found" });
        return;
      }

      res.json(quest);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deleted = await this.questService.delete(id);

      if (!deleted) {
        res.status(404).json({ message: "Quest not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
