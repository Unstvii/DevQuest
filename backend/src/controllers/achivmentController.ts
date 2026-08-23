import achivmentService from "../services/achivmentService";
import { Request, Response } from "express";

class achivmentController {
  constructor(private achivmentService: achivmentService) {}

  getAllAchivments = async (req: Request, res: Response) => {
    const getAllAchivments = await this.achivmentService.getAllAchivment(
      req.user!.id,
    );

    return res.status(200).json(
      getAllAchivments.map((achievement) => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        emoji: achievement.emoji,
        isSecret: achievement.isSecret,
        isUnlocked: achievement.userAchievements.length > 0,
        unlockedAt: achievement.userAchievements[0]?.unlockedAt ?? null,
      })),
    );
  };
}

export default achivmentController;
