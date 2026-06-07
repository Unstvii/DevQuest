import { useEffect, useState } from "react";
import { useQuestStore } from "@/store/quests/quests.store";
import { questService } from "@/services/questService/quest.service";
import { Quest } from "@/store/quests/quests.store";

export function useQuests() {
  const { quests, setQuests } = useQuestStore();
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

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

  const toggleCompleted = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addQuest = (quest: Quest) => {
    setQuests([...quests, quest]);
  };

  const filteredQuests = quests.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    quests,
    filteredQuests,
    search,
    setSearch,
    completed,
    toggleCompleted,
    addQuest,
  };
}
