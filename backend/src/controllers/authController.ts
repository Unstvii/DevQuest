import authService from "../services/authService";
import { Request, Response } from "express";



class authController {
    constructor(private authService: authService) { }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json({ message: "User created", user })
        } catch (error) {
            if (error instanceof Error) {
                const isKnownError = error.message.includes("taken");
                res.status(isKnownError ? 409 : 500).json({
                    message: error.message
                })
            } else {
                res.status(500).json({ message: "Unkown error" })
            }

        }


    }
    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.authService.login(req.body);
            res.status(201).json({ message: "Success login!", user });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

}

export default authController;