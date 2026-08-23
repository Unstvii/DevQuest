import { Request, Response } from "express";
import { QuestService } from "../services/questService";

export class QuestController {
  constructor(private questService: QuestService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const quests = await this.questService.getAll(req.user!.id);
      return res.status(200).json(quests);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  getById = async (req: Request, res: Response) => {
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

  create = async (req: Request, res: Response) => {
    try {
      const quest = await this.questService.create(req.user!.id, req.body);
      res.status(201).json(quest);
    } catch (error) {
      console.error("CREATE ERROR:", error);
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req.user!.id;
      const quest = await this.questService.update(id, userId, req.body);

      if (!quest) {
        res.status(404).json({ message: "Quest not found" });
        return;
      }

      res.json(quest);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  updateQuestStatus = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req.user!.id;

      const updatedQuest = await this.questService.updateQuestStatus(
        id,
        userId,
        req.body,
      );

      return res.status(200).json({
        quest: updatedQuest,
      });
    } catch (error) {
      console.error("UPDATE QUEST STATUS ERROR:", error);

      return res.status(400).json({
        message: "Quest not updated",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req.user!.id;

      const deleted = await this.questService.delete(id, userId);

      if (!deleted) {
        res.status(400).json({ message: "Quest not deleted" });
        return;
      }

      res.status(204).json({ message: "Quest successfully deleted!" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
