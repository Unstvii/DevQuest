"use client";
import { useState } from "react";
import useQuests from "@/hooks/quests/useQuests";
import QuestCard from "./QuestCard";
import QuestModal from "./QuestModal";

const QuestList = () => {
  const {
    filteredQuests,
    quests,
    search,
    setSearch,
    completed,
    updateQuestStatus,
    addQuest,
  } = useQuests();
  const [showModal, setShowModal] = useState(false);

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
            {completed.size} з {quests.length} виконано
          </p>
          <div
            className="mx-auto w-32 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--color-surface-overlay)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: quests.length
                  ? `${(completed.size / quests.length) * 100}%`
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
            onFocusCapture={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border-focus)")
            }
            onBlurCapture={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ color: "var(--color-text-muted)", flexShrink: 0 }}
            >
              <circle
                cx="7"
                cy="7"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10.5 10.5L13 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Пошук квестів..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--color-text-primary)" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="cursor-pointer"
                style={{ color: "var(--color-text-muted)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 3l8 8M11 3l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0"
            style={{
              background: "var(--color-brand)",
              color: "white",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10M3 8h10"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Новий квест
          </button>
        </div>
        <div className="w-full max-w-2xl flex flex-col gap-3">
          {filteredQuests.length === 0 && (
            <p
              className="text-center py-10 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Квестів не знайдено
            </p>
          )}
          {filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onToggle={() =>
                updateQuestStatus(
                  quest.id,
                  quest.status === "COMPLETED" ? "ACTIVE" : "COMPLETED",
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default QuestList;
