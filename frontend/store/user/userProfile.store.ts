import { create } from "zustand";

interface UserProfile {
  email: string | null;
  username: string | null;
  xp: number;
  streak: number;

  level: number;
  setUserProfile: (user: {
    email: string;
    streak: number;
    username: string;
    xp: number;
    level: number;
  }) => void;
  clearUserProfile: () => void;
}

export const useUserStore = create<UserProfile>((set) => ({
  email: null,
  username: null,
  xp: 0,
  level: 0,
  streak: 0,
  setUserProfile: (user) => set({ ...user }),
  clearUserProfile: () => set({ email: null, username: null, xp: 0, level: 0 }),
}));
