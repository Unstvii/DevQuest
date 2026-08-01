import { Crown, Flame, Trophy, Medal } from "lucide-react";
import React from "react";
type User = {
  id: number;
  nickname: string;
  level: number;
  streak: number;
};

const users: User[] = [
  {
    id: 1,
    nickname: "ReactMaster",
    level: 52,
    streak: 284,
  },
  {
    id: 2,
    nickname: "NextWizard",
    level: 49,
    streak: 170,
  },
  {
    id: 3,
    nickname: "TypeScript",
    level: 45,
    streak: 161,
  },
  {
    id: 4,
    nickname: "Kolia",
    level: 32,
    streak: 91,
  },
  {
    id: 5,
    nickname: "BackendDev",
    level: 28,
    streak: 74,
  },
];
const page = () => {
  return (
    <div className="bg-[var(--color-bg-base)] pt-30">
      <div className="space-y-5 w-[63.5%] my-0 mx-auto h-[90vh]">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          Leaderboard
        </h1>

        <div className="space-y-4">
          {users.map((user, index) => {
            const top =
              index === 0
                ? "border-yellow-400/40"
                : index === 1
                  ? "border-gray-300/40"
                  : index === 2
                    ? "border-orange-500/40"
                    : "";

            return (
              <div
                key={user.id}
                className={`group
                    rounded-2xl
                    border
                    ${top}
                    border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    hover:bg-[var(--color-surface-raised)]
                    transition-all
                    duration-300
                    px-6
                    py-4
                    flex
                    items-center
                    gap-5
                    hover:scale-[1.01]
                    hover:border-[var(--color-border-hover)]`}
              >
                <div className="w-10 flex justify-center">
                  {index === 0 && (
                    <Crown className="text-yellow-400" size={24} />
                  )}

                  {index === 1 && (
                    <Trophy className="text-gray-300" size={22} />
                  )}

                  {index === 2 && (
                    <Medal className="text-orange-400" size={22} />
                  )}

                  {index > 2 && (
                    <span className="font-bold text-lg text-[var(--color-text-muted)]">
                      #{index + 1}
                    </span>
                  )}
                </div>

                <img
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.nickname}`}
                  className="w-14 h-14 rounded-full border border-[var(--color-border)]"
                />

                <div className="flex-1">
                  <div className="font-semibold text-lg text-[var(--color-text-primary)]">
                    {user.nickname}
                  </div>

                  <div className="text-sm text-[var(--color-text-muted)]">
                    Developer
                  </div>
                </div>

                <div
                  className="
                        px-4
                        py-2
                        rounded-xl
                        bg-[var(--color-brand)]/10
                        border
                        border-[var(--color-border)]
                    "
                >
                  <span className="text-[var(--color-brand)] font-bold">
                    LV. {user.level}
                  </span>
                </div>

                <div
                  className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-orange-500/10
                        border
                        border-orange-500/20"
                >
                  <Flame size={18} className="text-[var(--color-streak)]" />

                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {user.streak}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
