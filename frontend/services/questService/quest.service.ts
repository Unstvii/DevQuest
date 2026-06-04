import api from "../axios";

export const questService = {
  getAllQuests: () => {
    return api.get("quests");
  },
};
