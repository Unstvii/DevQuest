import prisma from "../prisma/prismaClient";
import { CreateQuestDto, UpdateQuestDto } from "../models/quest";

export class QuestService {
  async getAll() {
    return await prisma.quest.findMany();
  }

  async getById(id: number) {
    return await prisma.quest.findUnique({ where: { id } });
  }

  async create(data: CreateQuestDto) {
    return await prisma.quest.create({ data });
  }

  async update(id: number, data: UpdateQuestDto) {
    // Перевіряємо чи існує запис перед оновленням
    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) return null;

    return await prisma.quest.update({ where: { id }, data });
  }

  async delete(id: number) {
    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) return null;

    return await prisma.quest.delete({ where: { id } });
  }
}
