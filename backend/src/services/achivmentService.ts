import prisma from "../prisma/prismaClient";

class achivmentService {
  getAllAchivment = async (userId: string) => {
    const [achievements, userStats] = await Promise.all([
      prisma.achievement.findMany({
        select: {
          id: true,
          key: true,
          name: true,
          description: true,
          emoji: true,
          category: true,
          conditionType: true,
          conditionValue: true,

          userAchievements: {
            where: {
              userId,
            },
            select: {
              unlockedAt: true,
            },
          },
        },
      }),

      prisma.userStats.findUnique({
        where: {
          userId,
        },
        select: {
          level: true,
          totalQuestsCompleted: true,
          totalBossesDefeated: true,
          streak: true,
        },
      }),
    ]);
    const achievementsWithProgress = achievements.map((achievement) => {
      let progress = 0;

      switch (achievement.conditionType) {
        case "QUESTS_COMPLETED":
        case "TOTAL_QUESTS_COMPLETED":
          progress = userStats?.totalQuestsCompleted ?? 0;
          break;

        case "BOSS_QUESTS_COMPLETED":
          progress = userStats?.totalBossesDefeated ?? 0;
          break;

        case "LEVEL_REACHED":
          progress = userStats?.level ?? 0;
          break;

        case "DAYS_STREAK":
          progress = userStats?.streak ?? 0;
          break;
      }

      return {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        emoji: achievement.emoji,

        isUnlocked: achievement.userAchievements.length > 0,

        progress: Math.min(progress, achievement.conditionValue),
        target: achievement.conditionValue,

        progressPercentage: Math.min(
          Math.round((progress / achievement.conditionValue) * 100),
          100,
        ),
      };
    });
    return achievementsWithProgress;
  };
}

export default achivmentService;
