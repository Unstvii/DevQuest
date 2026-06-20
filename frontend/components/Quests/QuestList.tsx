"use client";
import { useState } from "react";
import useQuests from "@/hooks/quests/useQuests";
import QuestCard from "./QuestCard";
import QuestModal from "./QuestModal";

const TABS = [
  { key: "ALL", label: "Всі" },
  { key: "ACTIVE", label: "Active" },
  { key: "COMPLETED", label: "Done" },
  { key: "ARCHIVED", label: "Archived" },
];

const QuestList = () => {
  const {
    filteredQuests,
    quests,
    search,
    setSearch,
    updateQuestStatus,
    addQuest,
    doneQuestCounter,
    deleteQuest,
  } = useQuests();

  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const doneQuests = doneQuestCounter();

  const statusFilteredQuests =
    statusFilter === "ALL"
      ? filteredQuests.filter((q) => q.status !== "ARCHIVED")
      : filteredQuests.filter((q) => q.status === statusFilter);

  return (
    <>
      {showModal && (
        <QuestModal onClose={() => setShowModal(false)} onAdd={addQuest} />
      )}

      <div
        className="min-h-screen flex flex-col items-center px-4 py-12"
        style={{ background: "var(--color-bg-base)" }}
      >
        <div className="text-center mb-8 w-full max-w-2xl">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--color-brand)" }}
          >
            Виконуй — отримуй XP
          </p>

          <h1
            className="text-4xl font-bold tracking-tight mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Квести
          </h1>

          <p
            className="text-sm mb-3"
            style={{ color: "var(--color-text-muted)" }}
          >
            {doneQuests.done} з {doneQuests.len} виконано
          </p>

          <div
            className="mx-auto w-32 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--color-surface-overlay)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: quests.length
                  ? `${(doneQuests.done / doneQuests.len) * 100}%`
                  : "0%",
                background: "var(--color-success)",
              }}
            />
          </div>
        </div>
        <div className="w-full max-w-2xl mb-5 flex gap-3">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 border transition-all duration-200 flex-1"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <input
              type="text"
              placeholder="Пошук квестів..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--color-text-primary)" }}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{
              background: "var(--color-brand)",
              color: "white",
            }}
          >
            Новий квест
          </button>
        </div>
        <div className="w-full max-w-2xl mb-6 relative">
          <div className="flex gap-2 relative">
            {TABS.map((tab) => {
              const active = statusFilter === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-all"
                  style={{
                    color: active
                      ? "var(--color-brand)"
                      : "var(--color-text-muted)",
                  }}
                >
                  {tab.label}
                  <span
                    className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full transition-all duration-300"
                    style={{
                      background: "var(--color-brand)",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      opacity: active ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-full max-w-2xl flex flex-col gap-3">
          {statusFilteredQuests.length === 0 && (
            <p
              className="text-center py-10 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Квестів не знайдено
            </p>
          )}

          {statusFilteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onDone={() =>
                updateQuestStatus(
                  quest.id,
                  quest.status === "COMPLETED" ? "ACTIVE" : "COMPLETED",
                )
              }
              onArchive={() => {
                updateQuestStatus(
                  quest.id,
                  quest.status === "ARCHIVED" ? "ACTIVE" : "ARCHIVED",
                );
              }}
              onDelete={() => {
                deleteQuest(quest.id);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestList;
