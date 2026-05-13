import prisma from "../prisma/prismaClient";
import { UserAuthDto } from "../models/user";
import bcrypt from "bcrypt";

class authService {
    findUsername = async (username: string) => {
        return await prisma.user.findUnique({ where: { username } });
    }
    findUseremail = async (email: string) => {
        return await prisma.user.findUnique({ where: { email } });
    }
    register = async (user: UserAuthDto) => {
        const existingUsername = await this.findUsername(user.username);
        if (existingUsername) {
            throw new Error("Username is already taken");
        }
        const existingEmail = await this.findUseremail(user.email);
        if (existingEmail) {
            throw new Error("Email is already taken");
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                passwordHash: hashedPassword.toString(),
                xp: 0,
                level: 1
            }
        })
        const { passwordHash, ...UserWithoutPassword } = newUser;
        return UserWithoutPassword;
    }
}

export default authService