import prisma from "../prisma/prismaClient";
import { Quest, UpdateQuestDto } from "../models/quest";

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
        id: id,
        userId: userId,
      },
    });
    if (!existingQuest) return null;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(existingQuest.completedAt, user?.xp, existingQuest.xpReward);

    if (data.status === "COMPLETED") {
      if (!existingQuest.completedAt) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            xp: {
              increment: 1,
            },
          },
        });
        const date = new Date();

        return await prisma.quest.update({
          where: { id },
          data: { status: data.status, completedAt: date },
        });
      }
    }

    return await prisma.quest.update({ where: { id }, data });
  }

  async delete(id: string, userId: string) {
    const existing = await prisma.quest.findUnique({
      where: { id, userId: userId },
    });
    if (!existing) return null;

    return await prisma.quest.delete({ where: { id, userId: userId } });
  }
}
