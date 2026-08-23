import prisma from "../prisma/prismaClient";

class userService {
  getUserInfo = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        email: true,
        stats: {
          select: {
            xp: true,
            level: true,
            streak: true,
          },
        },
      },
    });
    return user;
  };
  countUserCurrentLvlXp = (level: number) => {
    return Math.round(level * 1.6 * 100);
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
