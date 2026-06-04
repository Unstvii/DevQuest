import { create } from "zustand";

export default interface Quest {
  id: string;
  title: string;
  xpReward: number;
  description: string | null;
  type: "BOSS" | "DEFAULT";
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
