"use client";

import { Crown, Flame, Trophy, Medal } from "lucide-react";
import { userService } from "@/services/userService/user.service";
import { UserRating } from "@/services/userService/user.service";
import { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState<UserRating[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getRating();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="bg-[var(--color-bg-base)] pt-20 sm:pt-24 lg:pt-30">
      <div className="w-[92%] sm:w-[88%] lg:w-[63.5%] my-0 mx-auto min-h-[90vh] space-y-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
          Leaderboard
        </h1>

        <div className="space-y-3 sm:space-y-4">
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
                key={index}
                className={`
              group
              rounded-xl sm:rounded-2xl
              border
              ${top}
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              hover:bg-[var(--color-surface-raised)]
              transition-all
              duration-300
              px-3 py-3
              sm:px-4 sm:py-4
              lg:px-6
              flex items-center
              gap-3 sm:gap-4 lg:gap-5
              hover:scale-[1.01]
              hover:border-[var(--color-border-hover)]
            `}
              >
                <div className="w-7 sm:w-8 lg:w-10 shrink-0 flex justify-center">
                  {index === 0 && (
                    <Crown className="text-yellow-400" size={22} />
                  )}

                  {index === 1 && (
                    <Trophy className="text-gray-300" size={20} />
                  )}

                  {index === 2 && (
                    <Medal className="text-orange-400" size={20} />
                  )}

                  {index > 2 && (
                    <span className="font-bold text-sm sm:text-base lg:text-lg text-[var(--color-text-muted)]">
                      #{index + 1}
                    </span>
                  )}
                </div>
                <img
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.username}`}
                  alt={user.username}
                  className="
                shrink-0
                w-10 h-10
                sm:w-12 sm:h-12
                lg:w-14 lg:h-14
                rounded-full
                border border-[var(--color-border)]
              "
                />
                <div className="min-w-0 flex-1">
                  <div
                    className="
                truncate
                font-semibold
                text-sm sm:text-base lg:text-lg
                text-[var(--color-text-primary)]
              "
                  >
                    {user.username}
                  </div>

                  <div
                    className="
                text-xs sm:text-sm
                text-[var(--color-text-muted)]
              "
                  >
                    Developer
                  </div>
                </div>
                <div
                  className="
              shrink-0
              px-2.5 py-1.5
              sm:px-3 sm:py-2
              lg:px-4
              rounded-lg sm:rounded-xl
              bg-[var(--color-brand)]/10
              border border-[var(--color-border)]
            "
                >
                  <span
                    className="
                text-xs sm:text-sm
                lg:text-base
                text-[var(--color-brand)]
                font-bold
              "
                  >
                    LV. {user.level}
                  </span>
                </div>
                <div
                  className="
              shrink-0
              flex items-center
              gap-1.5 sm:gap-2
              px-2.5 py-1.5
              sm:px-3 sm:py-2
              lg:px-4
              rounded-lg sm:rounded-xl
              bg-orange-500/10
              border border-orange-500/20
            "
                >
                  <Flame
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] text-[var(--color-streak)]"
                  />

                  <span
                    className="
                text-sm sm:text-base
                font-semibold
                text-[var(--color-text-primary)]
              "
                  >
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
