import prisma from "../prisma/prismaClient";
import { Quest, UpdateQuestDto } from "../models/quest";
import { differenceInCalendarDays } from "date-fns";

export class QuestService {
  async getAll(userId: string) {
    return await prisma.quest.findMany({
      where: {
        userId,
      },
    });
  }

  async getById(id: string) {
    return await prisma.quest.findUnique({ where: { id } });
  }

  async create(userId: string, data: Quest) {
    return await prisma.quest.create({
      data: {
        userId,
        title: data.title,
        xpReward: data.xpReward,
        description: data.description,
        type: data.type,
      },
    });
  }

  async update(id: string, userId: string, data: UpdateQuestDto) {
    const existing = await prisma.quest.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!existing) return null;

    return await prisma.quest.update({ where: { id }, data });
  }
  async updateQuestStatus(
    id: string,
    userId: string,
    data: Pick<UpdateQuestDto, "status">,
  ) {
    const existingQuest = await prisma.quest.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingQuest) {
      throw new Error("Quest not found");
    }

    const user = await prisma.userStats.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error("User stats not found");
    }

    if (data.status === "COMPLETED" && !existingQuest.completedAt) {
      const lvlProgress = Math.round((user.level + 1.6) * 100);

      const isUserLvlUp = this.checklvlUp(
        user.xp,
        existingQuest.xpReward,
        lvlProgress,
      );

      if (isUserLvlUp) {
        const newXp = user.xp + existingQuest.xpReward - lvlProgress;

        await prisma.userStats.update({
          where: {
            userId,
          },
          data: {
            level: {
              increment: 1,
            },
            xp: newXp,
          },
        });
      } else {
        await prisma.userStats.update({
          where: {
            userId,
          },
          data: {
            xp: {
              increment: existingQuest.xpReward,
            },
          },
        });
      }

      return await prisma.quest.update({
        where: {
          id,
        },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
    }

    return await prisma.quest.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
    });
  }
  checklvlUp(userXP: number, questReward: number, lvlProgress: number) {
    if (lvlProgress <= userXP + questReward) {
      return true;
    }
    return false;
  }
  async updateStreak(id: string, userId: string, data: UpdateQuestDto) {
    const user = await prisma.userStats.findUnique({
      where: {
        userId,
      },
    });
    if (!user) {
      throw new Error("User stats not found");
    }
    if (!user.lastStreakDate) {
      await prisma.userStats.update({
        where: { userId },
        data: { streak: 1, lastStreakDate: new Date() },
      });
      return;
    }
    const diffDays = differenceInCalendarDays(new Date(), user.lastStreakDate);

    if (diffDays === 0) {
      return;
    }

    if (diffDays === 1) {
      await prisma.userStats.update({
        where: { userId },
        data: { streak: { increment: 1 }, lastStreakDate: new Date() },
      });
      return;
    }

    if (diffDays > 1) {
      await prisma.userStats.update({
        where: { userId },
        data: { streak: 1, lastStreakDate: new Date() },
      });
      return;
    }
  }

  async delete(id: string, userId: string) {
    const existing = await prisma.quest.findUnique({
      where: { id, userId: userId },
    });
    if (!existing) return null;

    return await prisma.quest.delete({ where: { id, userId: userId } });
  }
  getUserStats = async (userId: string) => {
    const userStats = await prisma.userStats.findUnique({
      where: {
        userId,
      },
    });
    return userStats;
  };
  checkAchievements = async (userId: string, questType: "NORMAL" | "BOSS") => {
    const stats = await this.getUserStats(userId);
    if (!stats) {
      return;
    }
    await this.checkLevelAchievements(userId, stats.level);
    await this.checkStreakAchievements(userId, stats.streak);
    await this.checkQuestAchievements(
      userId,
      stats.totalQuestsCompleted,
      stats.totalBossesDefeated,
      questType,
    );
  };
  updateQuestCounter = async (userId: string, questType: "NORMAL" | "BOSS") => {
    await prisma.userStats.update({
      where: {
        userId,
      },
      data: {
        totalQuestsCompleted: {
          increment: 1,
        },

        ...(questType === "BOSS" && {
          totalBossesDefeated: {
            increment: 1,
          },
        }),
      },
    });
  };

  checkLevelAchievements = async (userId: string, level: number) => {
    if (level >= 5) {
      await this.grantAchievement(userId, "LEVEL_5");
    }

    if (level >= 10) {
      await this.grantAchievement(userId, "LEVEL_10");
    }

    if (level >= 15) {
      await this.grantAchievement(userId, "LEVEL_15");
    }
  };
  checkStreakAchievements = async (userId: string, streak: number) => {
    if (streak >= 3) {
      await this.grantAchievement(userId, "STREAK_3");
    }
    if (streak >= 7) {
      await this.grantAchievement(userId, "STREAK_7");
    }
    if (streak >= 14) {
      await this.grantAchievement(userId, "STREAK_14");
    }
    if (streak >= 30) {
      await this.grantAchievement(userId, "STREAK_30");
    }
  };
  checkQuestAchievements = async (
    userId: string,
    totalQuestsCompleted: number,
    totalBossesDefeated: number,
    questType: "NORMAL" | "BOSS",
  ) => {
    if (totalQuestsCompleted + totalBossesDefeated >= 10) {
      await this.grantAchievement(userId, "TOTAL_QUESTS_10");
    }

    if (totalQuestsCompleted + totalBossesDefeated >= 50) {
      await this.grantAchievement(userId, "TOTAL_QUESTS_50");
    }

    if (totalQuestsCompleted + totalBossesDefeated >= 100) {
      await this.grantAchievement(userId, "TOTAL_QUESTS_100");
    }
    if (questType === "NORMAL") {
      if (totalQuestsCompleted >= 1) {
        await this.grantAchievement(userId, "FIRST_QUEST");
      }
      if (totalQuestsCompleted >= 5) {
        await this.grantAchievement(userId, "QUESTS_5");
      }
      if (totalQuestsCompleted >= 10) {
        await this.grantAchievement(userId, "QUESTS_10");
      }
      if (totalQuestsCompleted >= 25) {
        await this.grantAchievement(userId, "QUESTS_25");
      }
      if (totalQuestsCompleted >= 50) {
        await this.grantAchievement(userId, "QUESTS_50");
      }
      if (totalQuestsCompleted >= 100) {
        await this.grantAchievement(userId, "QUESTS_100");
      }
    }
    if (questType === "BOSS") {
      if (totalBossesDefeated >= 1) {
        await this.grantAchievement(userId, "FIRST_BOSS");
      }
      if (totalBossesDefeated >= 5) {
        await this.grantAchievement(userId, "BOSS_5");
      }
      if (totalBossesDefeated >= 10) {
        await this.grantAchievement(userId, "BOSS_10");
      }
      if (totalBossesDefeated >= 25) {
        await this.grantAchievement(userId, "BOSS_25");
      }
    }
  };
  grantAchievement = async (userId: string, achievementKey: string) => {
    const achievement = await prisma.achievement.findUnique({
      where: {
        key: achievementKey,
      },
    });

    if (!achievement) {
      throw new Error("Achievement not found");
    }

    const existingAchievement = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId: achievement.id,
        },
      },
    });

    if (existingAchievement) {
      return null;
    }

    return prisma.userAchievement.create({
      data: {
        userId,
        achievementId: achievement.id,
      },
    });
  };
}
