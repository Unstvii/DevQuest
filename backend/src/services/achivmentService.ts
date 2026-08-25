import prisma from "../prisma/prismaClient";

class achivmentService {
  getAllAchivment = async (userId: string) => {
    const achievements = await prisma.achievement.findMany({
      include: {
        userAchievements: {
          where: {
            userId,
          },
        },
      },
    });

    return achievements.map((achievement) => ({
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      emoji: achievement.emoji,
      isCompleted: achievement.userAchievements.length > 0,
      isSecret: achievement.isSecret,
    }));
  };
}

export default achivmentService;
