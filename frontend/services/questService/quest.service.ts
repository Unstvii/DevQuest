import api from "../axios";
import { Quest, QuestUpdate, QuestStatus } from "@/store/quests/quests.store";
export const questService = {
  getAllQuests: () => {
    return api.get("quests");
  },
  createQuest: (quest: Omit<Quest, "id">) => {
    return api.post("quests", quest);
  },
  updateQuest: (quest: QuestUpdate) => {
    return api.patch("quests", quest);
  },
  updateQuestStatus: (id: string, status: QuestStatus) => {
    return api.patch(`quests/${id}/status`, { status });
  },
  deleteQuest: (id: string) => {
    return api.delete(`quests/${id}`);
  },
};
