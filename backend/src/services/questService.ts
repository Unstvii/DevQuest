import prisma from "../prisma/prismaClient";
import { Quest, UpdateQuestDto } from "../models/quest";
import { differenceInCalendarDays } from "date-fns";

export class QuestService {
  async getAll(id: string) {
    return await prisma.quest.findMany({
      where: {
        userId: id,
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
    if (data.status != "COMPLETED") {
      return;
    }
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
}
