import achivmentService from "../services/achivmentService";
import { Request, Response } from "express";

class achivmentController {
  constructor(private achivmentService: achivmentService) {}

  getAllAchivments = async (req: Request, res: Response) => {
    const getAllAchivments = await this.achivmentService.getAllAchivment(
      req.user!.id,
    );

    return res.status(200).json(getAllAchivments);
  };

  unlockAchivment = async (req: Request, res: Response) => {};
}

export default achivmentController;
