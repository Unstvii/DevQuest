"use client";
import { useEffect, useState } from "react";
import { useQuestStore } from "@/store/quests/quests.store";
import Quest from "@/store/quests/quests.store";
import { questService } from "@/services/questService/quest.service";

function QuestCard({
  quest,
  completed,
  onToggle,
}: {
  quest: Quest;
  completed: boolean;
  onToggle: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isBoss = quest.type === "BOSS";
  const shortDesc = quest.description?.slice(0, 80);
  const hasMore = (quest.description?.length ?? 0) > 80;

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="rounded-2xl border transition-all duration-300 cursor-pointer"
      style={{
        background: completed
          ? "var(--color-surface-raised)"
          : "var(--color-surface)",
        borderColor: completed
          ? "rgba(16,185,129,0.3)"
          : expanded
            ? "var(--color-border-focus)"
            : "var(--color-border)",
        padding: "1.25rem 1.5rem",
        opacity: completed ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!completed)
          e.currentTarget.style.borderColor = "var(--color-border-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = completed
          ? "rgba(16,185,129,0.3)"
          : expanded
            ? "var(--color-border-focus)"
            : "var(--color-border)";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Complete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(quest.id);
            }}
            className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
            title={completed ? "Відмітити невиконаним" : "Завершити квест"}
            style={{
              borderColor: completed
                ? "var(--color-success)"
                : "var(--color-border-focus)",
              background: completed ? "var(--color-success)" : "transparent",
            }}
          >
            {completed ? (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M2 5.5l2.5 2.5L9 3"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M2 5.5l2.5 2.5L9 3"
                  stroke="var(--color-border-focus)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.4"
                />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {isBoss && (
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide uppercase"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  color: "var(--color-danger)",
                }}
              >
                ⚔ Boss
              </span>
            )}
            <h3
              className="font-semibold text-base transition-all duration-200"
              style={{
                color: completed
                  ? "var(--color-text-muted)"
                  : "var(--color-text-primary)",
                textDecoration: completed ? "line-through" : "none",
              }}
            >
              {quest.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-sm font-semibold px-2.5 py-0.5 rounded-full"
            style={{
              background: completed
                ? "rgba(16,185,129,0.1)"
                : "rgba(99,102,241,0.1)",
              color: completed ? "var(--color-success)" : "var(--color-brand)",
            }}
          >
            {completed ? "✓" : "+"}
            {quest.xpReward} XP
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              color: "var(--color-text-muted)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
              flexShrink: 0,
            }}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {!expanded && quest.description && (
        <p
          className="mt-2 text-sm leading-relaxed ml-9"
          style={{ color: "var(--color-text-muted)" }}
        >
          {shortDesc}
          {hasMore && (
            <span style={{ color: "var(--color-brand-light)" }}>…</span>
          )}
        </p>
      )}

      {expanded && (
        <div className="mt-4 ml-9 space-y-4">
          {quest.description && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-body)" }}
            >
              {quest.description}
            </p>
          )}
          <div
            className="flex items-center justify-between pt-3 text-xs"
            style={{
              borderTop: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            <span className="flex items-center gap-1.5">
              Тип:
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: isBoss
                    ? "rgba(239,68,68,0.1)"
                    : "rgba(16,185,129,0.1)",
                  color: isBoss
                    ? "var(--color-danger)"
                    : "var(--color-success)",
                }}
              >
                {quest.type}
              </span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(quest.id);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 cursor-pointer"
              style={{
                background: completed
                  ? "rgba(16,185,129,0.12)"
                  : "rgba(99,102,241,0.12)",
                color: completed
                  ? "var(--color-success)"
                  : "var(--color-brand)",
                border: `1px solid ${completed ? "rgba(16,185,129,0.25)" : "rgba(99,102,241,0.25)"}`,
              }}
            >
              {completed ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                  Виконано
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle
                      cx="6"
                      cy="6"
                      r="4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 4v2l1.5 1.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>{" "}
                  Завершити квест
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddQuestModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (quest: Quest) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState(100);
  const [type, setType] = useState<"DEFAULT" | "BOSS">("DEFAULT");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || null,
      xpReward,
      type,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 space-y-4"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-focus)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Новий квест
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 rounded-lg transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label
            className="text-xs font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            Назва *
          </label>
          <input
            type="text"
            placeholder="Введи назву квесту..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition-all"
            style={{
              background: "var(--color-surface-raised)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-border-focus)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label
            className="text-xs font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            Опис
          </label>
          <textarea
            placeholder="Описи завдання..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition-all resize-none"
            style={{
              background: "var(--color-surface-raised)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-border-focus)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        {/* XP + Type */}
        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              XP нагорода
            </label>
            <input
              type="number"
              min={1}
              value={xpReward}
              onChange={(e) => setXpReward(Number(e.target.value))}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition-all"
              style={{
                background: "var(--color-surface-raised)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--color-border-focus)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--color-border)")
              }
            />
          </div>

          <div className="flex-1 space-y-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Тип
            </label>
            <div className="flex gap-2">
              {(["DEFAULT", "BOSS"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="flex-1 rounded-xl py-2.5 text-xs font-semibold border transition-all cursor-pointer"
                  style={{
                    background:
                      type === t
                        ? t === "BOSS"
                          ? "rgba(239,68,68,0.12)"
                          : "rgba(99,102,241,0.12)"
                        : "var(--color-surface-raised)",
                    borderColor:
                      type === t
                        ? t === "BOSS"
                          ? "rgba(239,68,68,0.4)"
                          : "var(--color-border-focus)"
                        : "var(--color-border)",
                    color:
                      type === t
                        ? t === "BOSS"
                          ? "var(--color-danger)"
                          : "var(--color-brand)"
                        : "var(--color-text-muted)",
                  }}
                >
                  {t === "BOSS" ? "⚔ Boss" : "Default"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          style={{
            background: title.trim()
              ? "var(--color-brand)"
              : "var(--color-surface-overlay)",
            color: title.trim() ? "white" : "var(--color-text-disabled)",
          }}
        >
          Створити квест
        </button>
      </div>
    </div>
  );
}

export default function QuestList() {
  const { quests, setQuests } = useQuestStore();
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getQuests = async () => {
      try {
        const { data } = await questService.getAllQuests();
        setQuests(data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuests();
  }, []);

  const toggleCompleted = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddQuest = (quest: Quest) => {
    setQuests([...quests, quest]);
  };

  const filtered = quests.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {showModal && (
        <AddQuestModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddQuest}
        />
      )}

      <div
        className="min-h-screen flex flex-col items-center px-4 py-12"
        style={{ background: "var(--color-bg-base)" }}
      >
        {/* Header */}
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

        {/* Search + Add */}
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

        {/* List */}
        <div className="w-full max-w-2xl flex flex-col gap-3">
          {filtered.length === 0 && (
            <p
              className="text-center py-10 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Квестів не знайдено
            </p>
          )}
          {filtered.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              completed={completed.has(quest.id)}
              onToggle={toggleCompleted}
            />
          ))}
        </div>
      </div>
    </>
  );
}
