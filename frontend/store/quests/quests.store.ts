import { create } from "zustand";

export type QuestType = "DEFAULT" | "BOSS";

export interface Quest {
  id: string;
  title: string;
  xpReward: number;
  description: string | null;
  type: QuestType;
}

export interface NewQuestPayload {
  title: string;
  xpReward: number;
  description: string | null;
  type: QuestType;
}

interface QuestStore {
  quests: Quest[];
  setQuests: (quests: Quest[]) => void;
  clearQuests: () => void;
}

export const useQuestStore = create<QuestStore>((set) => ({
  quests: [],
  setQuests: (quests) => set({ quests }),
  clearQuests: () => set({ quests: [] }),
}));
