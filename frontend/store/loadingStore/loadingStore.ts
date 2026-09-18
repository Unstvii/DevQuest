import { create } from "zustand";

interface LoadingStore {
  activeRequests: number;
  loadingMessage: string;
  startLoading: () => void;
  stopLoading: () => void;
}

export const loadingStore = create<LoadingStore>((set) => ({
  activeRequests: 0,
  loadingMessage: "Loading...",

  startLoading: () => {
    set((state) => ({
      activeRequests: state.activeRequests + 1,
    }));
  },

  stopLoading: () => {
    set((state) => ({
      activeRequests: Math.max(0, state.activeRequests - 1),
    }));
  },
}));
