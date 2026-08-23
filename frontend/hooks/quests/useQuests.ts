import { useEffect, useState } from "react";
import {
  Quest,
  QuestStatus,
  QuestUpdate,
  useQuestStore,
} from "@/store/quests/quests.store";
import { questService } from "@/services/questService/quest.service";

const useQuests = () => {
  const quests = useQuestStore((state) => state.quests);
  const setQuests = useQuestStore((state) => state.setQuests);

  const [search, setSearch] = useState("");

  // GET ALL QUESTS
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const { data } = await questService.getAllQuests();

        setQuests(data);
      } catch (error) {
        console.error("[useQuests] Failed to fetch quests:", error);
      }
    };

    fetchQuests();
  }, []);

  // UPDATE QUEST STATUS
  const updateQuestStatus = async (id: string, status: QuestStatus) => {
    try {
      console.log("➡️ UPDATE STATUS REQUEST:", {
        id,
        status,
      });

      const response = await questService.updateQuestStatus(id, status);

      console.log("⬅️ UPDATE STATUS RESPONSE:", response);
      console.log("⬅️ RESPONSE DATA:", response.data);
      console.log("⬅️ RESPONSE QUEST:", response.data?.quest);

      if (!response.data?.quest) {
        console.error("❌ Backend did not return quest:", response.data);
        return;
      }

      setQuests((prev) =>
        prev.map((quest) => (quest.id === id ? response.data.quest : quest)),
      );
    } catch (error) {
      console.error(
        `[useQuests] Failed to update quest status to ${status}:`,
        error,
      );
    }
  };

  // CREATE QUEST
  const addQuest = async (quest: Omit<Quest, "id">) => {
    try {
      const { data } = await questService.createQuest(quest);

      if (!data) {
        console.error("[useQuests] Create quest returned empty data");
        return;
      }

      setQuests((prev) => [...prev, data]);
    } catch (error) {
      console.error("[useQuests] Failed to create quest:", error);
    }
  };

  // UPDATE QUEST
  const updateQuest = async (quest: QuestUpdate) => {
    try {
      const { data } = await questService.updateQuest(quest);

      if (!data) {
        console.error("[useQuests] Update quest returned empty data");
        return;
      }

      setQuests((prev) =>
        prev.map((currentQuest) =>
          currentQuest.id === data.id ? data : currentQuest,
        ),
      );
    } catch (error) {
      console.error("[useQuests] Failed to update quest:", error);
    }
  };

  // DELETE QUEST
  const deleteQuest = async (id: string) => {
    try {
      await questService.deleteQuest(id);

      setQuests((prev) => prev.filter((quest) => quest.id !== id));
    } catch (error) {
      console.error("[useQuests] Failed to delete quest:", error);
    }
  };

  // QUEST COUNTER
  const doneQuestCounter = () => {
    const activeQuests = quests.filter((quest) => quest.status !== "ARCHIVED");

    const completedQuests = quests.filter(
      (quest) => quest.status === "COMPLETED",
    );

    return {
      len: activeQuests.length,
      done: completedQuests.length,
    };
  };

  // SEARCH
  const filteredQuests = quests.filter((quest) => {
    if (!quest) {
      console.error("[useQuests] Invalid quest in state:", quests);
      return false;
    }

    return quest.title.toLowerCase().includes(search.toLowerCase());
  });

  return {
    quests,
    filteredQuests,
    search,
    setSearch,
    updateQuestStatus,
    updateQuest,
    addQuest,
    doneQuestCounter,
    deleteQuest,
  };
};

export default useQuests;
