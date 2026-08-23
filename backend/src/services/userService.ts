import prisma from "../prisma/prismaClient";

class userService {
  getUserInfo = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };
  getUsersRating = async () => {
    const users = await prisma.user.findMany({
      select: {
        username: true,
      },
      take: 10,
    });
    return users;
  };
}

export default userService;
