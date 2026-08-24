import authService from "../services/authService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class authController {
  private refreshSecret = process.env.REFRESH_SECRET!;
  private accessSecret = process.env.ACCESS_SECRET!;

  constructor(private authService: authService) {}

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      if (error instanceof Error) {
        const isKnownError = error.message.includes("taken");
        res.status(isKnownError ? 409 : 500).json({
          message: error.message,
        });
      } else {
        res.status(500).json({ message: "Unkown error" });
      }
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = await this.authService.login(
        req.body,
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      });

      res.status(201).json({ message: "Success login!" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
  logout = async (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.json({ message: "Logged out" });
  };
  refreshToken = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(401).json({ message: "Refresh token is missing" });
        return;
      }
      const decoded = jwt.verify(refreshToken, this.refreshSecret) as {
        id: string;
      };

      const accessToken = jwt.sign({ id: decoded.id }, this.accessSecret, {
        expiresIn: "1h",
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken: accessToken });
    } catch (error) {
      res.status(403).json({ message: "Token is not valid" });
    }
  };
}

export default authController;
