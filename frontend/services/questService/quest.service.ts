import api from "../axios";
import { Quest } from "@/store/quests/quests.store";
export const questService = {
  getAllQuests: () => {
    return api.get("quests");
  },
  createQuest: (quest: Quest) => {
    return api.post("quests", quest);
  },
};
