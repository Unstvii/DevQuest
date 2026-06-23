"use client";
import { useState, useEffect } from "react";
import type {
  Quest,
  QuestType,
  NewQuestPayload,
} from "../../store/quests/quests.store";

interface QuestModalProps {
  onClose: () => void;
  onSubmit: (data: NewQuestPayload) => void;
  quest?: Quest; // якщо передано — модал працює в режимі редагування
}

const INITIAL_FORM: NewQuestPayload = {
  title: "",
  description: "",
  xpReward: 100,
  type: "NORMAL",
};

const toFormState = (quest?: Quest): NewQuestPayload =>
  quest
    ? {
        title: quest.title,
        description: quest.description ?? "",
        xpReward: quest.xpReward,
        type: quest.type,
      }
    : INITIAL_FORM;

const QuestModal = ({ onClose, onSubmit, quest }: QuestModalProps) => {
  const isEditMode = Boolean(quest);
  const [form, setForm] = useState<NewQuestPayload>(toFormState(quest));

  // якщо модал переоткрили з іншим квестом (наприклад, не розмонтовуючи) — синхронізуємо форму
  useEffect(() => {
    setForm(toFormState(quest));
  }, [quest]);

  const handleChange = <K extends keyof NewQuestPayload>(
    key: K,
    value: NewQuestPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description ? form.description.trim() : null,
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
            {isEditMode ? "Редагувати квест" : "Новий квест"}
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
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
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

        <div className="space-y-1.5">
          <label
            className="text-xs font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            Опис
          </label>
          <textarea
            placeholder="Описи завдання..."
            value={form.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
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
              value={form.xpReward}
              onChange={(e) => handleChange("xpReward", Number(e.target.value))}
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
              {(["NORMAL", "BOSS"] as QuestType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => handleChange("type", t)}
                  className="flex-1 rounded-xl py-2.5 text-xs font-semibold border transition-all cursor-pointer"
                  style={{
                    background:
                      form.type === t
                        ? t === "BOSS"
                          ? "rgba(239,68,68,0.12)"
                          : "rgba(99,102,241,0.12)"
                        : "var(--color-surface-raised)",
                    borderColor:
                      form.type === t
                        ? t === "BOSS"
                          ? "rgba(239,68,68,0.4)"
                          : "var(--color-border-focus)"
                        : "var(--color-border)",
                    color:
                      form.type === t
                        ? t === "BOSS"
                          ? "var(--color-danger)"
                          : "var(--color-brand)"
                        : "var(--color-text-muted)",
                  }}
                >
                  {t === "BOSS" ? "⚔ Boss" : "NORMAL"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!form.title.trim()}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          style={{
            background: form.title.trim()
              ? "var(--color-brand)"
              : "var(--color-surface-overlay)",
            color: form.title.trim() ? "white" : "var(--color-text-disabled)",
          }}
        >
          {isEditMode ? "Зберегти зміни" : "Створити квест"}
        </button>
      </div>
    </div>
  );
};

export default QuestModal;
