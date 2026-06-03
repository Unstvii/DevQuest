import { QuestType } from "@prisma/client";

export interface Quest {
  title: string;
  description?: string;
  xpReward: number;
  type?: QuestType;
  dueDate?: Date;
}

export type UpdateQuestDto = Partial<Quest>;
