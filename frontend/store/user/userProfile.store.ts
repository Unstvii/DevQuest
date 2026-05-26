import { create } from "zustand";

interface UserProfile {
  email: string | null;
  username: string | null;
  xp: number;
  level: number;
  setUserProfile: (user: {
    email: string;
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
  setUserProfile: (user) => set({ ...user }),
  clearUserProfile: () => set({ email: null, username: null, xp: 0, level: 0 }),
}));
