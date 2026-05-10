export interface Quest {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateQuestDto = Pick<Quest, "title" | "description">;
export type UpdateQuestDto = Partial<CreateQuestDto>;
