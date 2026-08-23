import prisma from "../prisma/prismaClient";

class achivmentService {
  getAllAchivment = async (userId: string) => {
    const achievement = await prisma.achievement.findMany({
      include: {
        userAchievements: {
          where: {
            id: userId,
          },
        },
      },
    });
    return achievement;
  };
  checkAchievement = async (userId: string) => {
    const getUserData = await prisma.userStats.findUnique({
      where: { id: userId },
    });
    return getUserData;
  };
}

export default achivmentService;
