import prisma from "../prisma/prismaClient";
import { UserAuthDto } from "../models/user";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
class authService {
  private ACCESS_SECRET = process.env.ACCESS_SECRET!;
  private REFRESH_SECRET = process.env.REFRESH_SECRET!;

  findUsername = async (username: string) => {
    return await prisma.user.findUnique({ where: { username } });
  };
  findUseremail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  };
  register = async (user: UserAuthDto) => {
    const existingUsername = await this.findUsername(user.username);
    if (existingUsername) {
      throw new Error("Username is already taken");
    }
    const existingEmail = await this.findUseremail(user.email);
    if (existingEmail) {
      throw new Error("Email is already taken");
    }
    const hashedPassword = await bcrypt.hash(user.passwordHash, 10);
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        passwordHash: hashedPassword,
        xp: 0,
        level: 1,
      },
    });
    const { passwordHash, ...UserWithoutPassword } = newUser;
    return UserWithoutPassword;
  };
  login = async (user: User) => {
    const findUser = await this.findUseremail(user.email);
    if (!findUser) {
      throw new Error("Email not found");
    }

    const checkPassword = await bcrypt.compare(
      user.passwordHash,
      findUser.passwordHash,
    );
    if (!checkPassword) {
      throw new Error("Wrong password!");
    }

    return this.createToken(findUser);
  };
  createToken = async (
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const payload = {
      id: user.id,
    };

    const accessToken = jwt.sign(payload, this.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, this.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  };
}

export default authService;
