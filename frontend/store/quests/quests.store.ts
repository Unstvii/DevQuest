import { create } from "zustand";

export type QuestType = "NORMAL" | "BOSS";
export type QuestStatus = "ACTIVE" | "COMPLETED" | "FAILED" | "ARCHIVED";

export interface Quest {
  id: string;
  title: string;
  xpReward: number;
  description: string | null;
  type: QuestType;
  status: QuestStatus;
}
export interface QuestUpdate {
  id: string;
  title: string | null;
  xpReward: number | null;
  description: string | null;
  type: QuestType;
  status: QuestStatus;
}

export interface NewQuestPayload {
  title: string;
  xpReward: number;
  description: string | null;
  type: QuestType;
}

interface QuestStore {
  quests: Quest[];
  setQuests: (quests: Quest[] | ((prev: Quest[]) => Quest[])) => void;
  clearQuests: () => void;
}

export const useQuestStore = create<QuestStore>((set) => ({
  quests: [],
  setQuests: (quests) =>
    set((state) => ({
      quests: typeof quests === "function" ? quests(state.quests) : quests,
    })),
  clearQuests: () => set({ quests: [] }),
}));
