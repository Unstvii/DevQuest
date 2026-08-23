import userService from "../services/userService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const access_secret = process.env.ACCESS_SECRET!;

class userController {
  constructor(private userService: userService) {}

  decodeToken = (token: string) => {
    try {
      return jwt.verify(token, access_secret);
    } catch {
      return null;
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Missing token!" });
    }

    const decoded = this.decodeToken(accessToken);

    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({ message: "No token found!" });
    }

    const user = await this.userService.getUserInfo(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  };
  getUsersRating = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsersRating();

      return res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error get users rating" });
    }
  };
}

export default userController;
