"use client";

import { achivmentService } from "@/services/achivmentService/achivment.service";
import { useEffect, useState } from "react";

type AchievementCardProps = {
  name: string;
  description: string;
  emoji: string;
  id: string;
};

const AchievementCard = ({
  name,
  description,
  emoji,
  id,
}: AchievementCardProps) => {
  return (
    <article
      className={`
        group relative overflow-hidden rounded-2xl border
        p-5 transition-all duration-300
        ${
          id
            ? `
              border-(--color-brand)/30
              bg-(--color-brand)/10
              shadow-[0_0_30px_rgba(99,102,241,0.12)]
              hover:-translate-y-1
              hover:border-(--color-brand)/50
              hover:shadow-[0_8px_35px_rgba(99,102,241,0.2)]
            `
            : `
              border-(--color-border)
              bg-(--color-surface)
              opacity-75
              hover:-translate-y-1
              hover:border-(--color-border-hover)
              hover:opacity-100
            `
        }
      `}
    >
      {id && (
        <div
          className="
            pointer-events-none absolute -right-12 -top-12
            h-32 w-32 rounded-full
            bg-(--color-brand)/15
            blur-3xl
          "
        />
      )}

      <div className="relative flex items-start gap-4">
        <div
          className={`
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-xl text-xl transition-all duration-300
            ${
              id
                ? `
                  bg-(--color-brand)
                  text-white
                  shadow-[0_0_20px_rgba(99,102,241,0.35)]
                `
                : `
                  bg-(--color-surface-raised)
                  text-(--color-text-muted)
                  group-hover:bg-(--color-surface-overlay)
                `
            }
          `}
        >
          {emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-3">
            <h3
              className={`
                truncate text-base font-semibold
                ${
                  id
                    ? "text-(--color-text-primary)"
                    : "text-(--color-text-body)"
                }
              `}
            >
              {name}
            </h3>

            {id && (
              <span
                className="
                  shrink-0 rounded-full
                  bg-(--color-success)/10
                  px-2.5 py-1
                  text-xs font-medium
                  text-(--color-success)
                "
              >
                Виконано
              </span>
            )}
          </div>

          <p
            className="
              line-clamp-2 text-sm leading-relaxed
              text-(--color-text-muted)
            "
          >
            {description}
          </p>
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-2">
        <div
          className={`
            h-1.5 flex-1 overflow-hidden rounded-full
            bg-(--color-surface-raised)
          `}
        >
          <div
            className={`
              h-full rounded-full transition-all duration-500
              ${id ? "w-full bg-(--color-brand)" : "w-0 bg-(--color-brand)"}
            `}
          />
        </div>

        <span
          className={`
            text-xs font-medium
            ${id ? "text-(--color-brand)" : "text-(--color-text-disabled)"}
          `}
        >
          {id ? "100%" : "0%"}
        </span>
      </div>
    </article>
  );
};

const Page = () => {
  type Achievement = {
    name: string;
    description: string;
    emoji: string;
    isCompleted: boolean;
    id: string;
  };
  const [achievement, setAchievement] = useState<Achievement[]>([]);
  const completedCount = achievement.filter(
    (achievement) => achievement.isCompleted,
  ).length;
  useEffect(() => {
    const getAchi = async () => {
      try {
        const getAchivments = await achivmentService.getAllAchivment();
        console.log(getAchivments);
        setAchievement(getAchivments.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAchi();
  }, []);

  return (
    <main className="min-h-screen bg-(--color-bg-base)">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h1
            className="
              text-4xl font-bold tracking-tight
              text-(--color-text-primary)
            "
          >
            Досягнення
          </h1>
          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full border border-(--color-border)
              bg-(--color-surface)
              px-4 py-2
              text-sm font-medium
              text-(--color-text-muted)
              mt-5
            "
          >
            <span className="h-2 w-2 rounded-full bg-(--color-brand)" />
            {completedCount} / {achievement.length} досягнень
          </div>
        </div>

        <div
          className="
            grid gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {achievement.map((item) => (
            <AchievementCard
              key={item.id}
              name={item.name}
              description={item.description}
              emoji={item.emoji}
              id={item.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
