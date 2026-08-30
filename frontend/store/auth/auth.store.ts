import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isAuthLoading: true,

  setIsAuthenticated: (value) =>
    set({
      isAuthenticated: value,
      isAuthLoading: false,
    }),
}));
