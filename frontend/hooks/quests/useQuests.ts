import { useEffect, useState } from "react";
import {
  QuestUpdate,
  useQuestStore,
  QuestStatus,
} from "@/store/quests/quests.store";
import { questService } from "../../services/questService/quest.service";
import { Quest } from "@/store/quests/quests.store";
import { useStoreWithEqualityFn } from "zustand/traditional";

const useQuests = () => {
  const { quests, setQuests } = useQuestStore();
  const [search, setSearch] = useState("");

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

  const updateQuestStatus = async (id: string, status: QuestStatus) => {
    try {
      const updated = await questService.updateQuestStatus(id, status);
      setQuests((prev) =>
        prev.map((q) => (q.id === id ? updated.data.quest : q)),
      );
    } catch (error) {
      console.error(
        `[useQuests] Failed to update quest status to ${status}:`,
        error,
      );
    }
  };

  const addQuest = async (quest: Omit<Quest, "id">) => {
    try {
      const createdQuest = await questService.createQuest(quest);
      setQuests([...quests, createdQuest.data]);
    } catch (error) {
      console.error("[useQuests] Failed to create quests:", error);
    }
  };

  const deleteQuest = async (id: string) => {
    try {
      await questService.deleteQuest(id);
      setQuests((prevQuests) => prevQuests.filter((quest) => quest.id !== id));
    } catch (error) {
      console.error("[useQuests] failed to delete quests:", error);
    }
  };

  const doneQuestCounter = () => {
    return {
      len: quests.length,
      done: quests.reduce(
        (acc, quest) => (quest.status === "COMPLETED" ? acc + 1 : acc),
        0,
      ),
    };
  };
  const updateQuest = async (quest: QuestUpdate) => {
    try {
      const updatedQuest = await questService.updateQuest(quest);
      setQuests(
        quests.map((quest) =>
          quest.id === updatedQuest.data.id ? updatedQuest.data : quest,
        ),
      );
    } catch (error) {
      console.error("[useQuests] Failed to update quests:", error);
    }
  };

  const filteredQuests = quests.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    quests,
    filteredQuests,
    search,
    setSearch,
    updateQuestStatus,
    addQuest,
    doneQuestCounter,
    deleteQuest,
  };
};

export default useQuests;
