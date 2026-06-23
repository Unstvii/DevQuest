"use client";
import { useState } from "react";
import { Quest } from "@/store/quests/quests.store";

interface QuestCardProps {
  quest: Quest;
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onEdit: (quest: Quest) => void;
}

const QuestCard = ({
  quest,
  onDone,
  onDelete,
  onArchive,
  onEdit,
}: QuestCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const completed = quest.status === "COMPLETED";
  const archived = quest.status === "ARCHIVED";
  const isBoss = quest.type === "BOSS";
  const isInactive = completed || archived;

  const shortDesc = quest.description?.slice(0, 80);
  const hasMore = (quest.description?.length ?? 0) > 80;

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="rounded-2xl border transition-all duration-300 cursor-pointer"
      style={{
        background: isInactive
          ? "var(--color-surface-raised)"
          : "var(--color-surface)",
        borderColor: completed
          ? "var(--color-success)"
          : archived
            ? "var(--color-border)"
            : expanded
              ? "var(--color-border-focus)"
              : "var(--color-border)",
        padding: "1.25rem 1.5rem",
        opacity: isInactive ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isInactive)
          e.currentTarget.style.borderColor = "var(--color-border-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = completed
          ? "var(--color-success)"
          : archived
            ? "var(--color-border)"
            : expanded
              ? "var(--color-border-focus)"
              : "var(--color-border)";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDone(quest.id);
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
                  background: "var(--color-surface-overlay)",
                  color: "var(--color-danger)",
                }}
              >
                ⚔ Boss
              </span>
            )}
            {archived && (
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide uppercase"
                style={{
                  background: "var(--color-surface-overlay)",
                  color: "var(--color-text-muted)",
                }}
              >
                Архів
              </span>
            )}
            <h3
              className="font-semibold text-base transition-all duration-200"
              style={{
                color: isInactive
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
              background: "var(--color-surface-overlay)",
              color: completed ? "var(--color-success)" : "var(--color-brand)",
            }}
          >
            {completed ? "✓" : "+"}
            {quest.xpReward} XP
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onArchive(quest.id);
            }}
            title="Архівувати квест"
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: "var(--color-surface-overlay)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(245,158,11,0.14)";
              e.currentTarget.style.color = "var(--color-warning)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-surface-overlay)";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4h12M3 4v9a1 1 0 001 1h8a1 1 0 001-1V4M6 4V2.5A.5.5 0 016.5 2h3a.5.5 0 01.5.5V4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 7.5v3M9.5 7.5v3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(quest);
            }}
            title="Редагувати квест"
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: "var(--color-surface-overlay)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.14)";
              e.currentTarget.style.color = "var(--color-brand)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-surface-overlay)";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 2.5l2 2L5 13l-3 1 1-3 8.5-8.5z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(quest.id);
            }}
            title="Видалити квест"
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: "var(--color-surface-overlay)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.14)";
              e.currentTarget.style.color = "var(--color-danger)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-surface-overlay)";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 4.5h10M5.5 4.5V3a1 1 0 011-1h3a1 1 0 011 1v1.5M6.5 7.5v4M9.5 7.5v4M4 4.5l.7 8.4a1 1 0 001 .9h4.6a1 1 0 001-.9l.7-8.4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

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
                    ? "var(--color-surface-overlay)"
                    : "var(--color-bg-base)",
                  color: isBoss
                    ? "var(--color-danger)"
                    : "var(--color-success)",
                }}
              >
                {quest.type}
              </span>
            </span>

            {!archived && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDone(quest.id);
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
                    </svg>
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
                    </svg>
                    Завершити квест
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestCard;
