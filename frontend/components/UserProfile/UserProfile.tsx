"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth/auth.store";

import { userService } from "@/services/userService/user.service";
import { useUserStore } from "@/store/user/userProfile.store";

const UserProfile = () => {
  const { accessToken } = useAuthStore();
  const { setUserProfile, clearUserProfile, username, email, xp, level } =
    useUserStore();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(accessToken);
        const user = await userService.getMe(accessToken);
        setUserProfile(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        clearUserProfile();
      }
    };

    fetchUser();
  }, [accessToken]);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72">
      <div
        className="
    flex flex-col items-center gap-6
    bg-[var(--color-surface)] rounded-2xl
    border border-[var(--color-border)]
    shadow-xl shadow-black/10
    p-8
  "
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="
        w-16 h-16 rounded-2xl
        bg-[var(--color-brand)]/15
        border-2 border-[var(--color-brand)]/30
        flex items-center justify-center
      "
          >
            <svg
              className="w-8 h-8 text-[var(--color-brand)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <h1 className="text-base font-semibold text-[var(--color-text-primary)]">
              {username}
            </h1>
            <span className="text-xs text-[var(--color-text-muted)]">
              {email}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-[var(--color-border)]" />

        <div className="w-full flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-text-muted)]">Досвід</span>
            <span className="font-medium text-[var(--color-brand)]">
              {xp} XP
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-raised)]">
            <div
              className="h-full rounded-full bg-[var(--color-brand)] transition-all duration-500"
              style={{ width: `${Math.min((xp % 1000) / 10, 100)}%` }}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <div
            className="
        flex flex-col items-center gap-0.5 py-3 rounded-xl
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
      "
          >
            <span className="text-[11px] text-[var(--color-text-muted)]">
              Рівень
            </span>
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              {level}
            </span>
          </div>
          <div
            className="
        flex flex-col items-center gap-0.5 py-3 rounded-xl
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
      "
          >
            <span className="text-[11px] text-[var(--color-text-muted)]">
              XP
            </span>
            <span className="text-lg font-bold text-[var(--color-streak)]">
              {xp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
