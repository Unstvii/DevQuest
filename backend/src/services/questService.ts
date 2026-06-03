import prisma from "../prisma/prismaClient";
import { Quest, UpdateQuestDto } from "../models/quest";

export class QuestService {
  async getAll() {
    return await prisma.quest.findMany();
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

  async update(id: string, data: UpdateQuestDto) {
    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) return null;

    return await prisma.quest.update({ where: { id }, data });
  }

  async delete(id: string) {
    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) return null;

    return await prisma.quest.delete({ where: { id } });
  }
}
