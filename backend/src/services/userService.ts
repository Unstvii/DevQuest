import prisma from "../prisma/prismaClient";

class userService {
  getUserInfo = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };
}

export default userService;
