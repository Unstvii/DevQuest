"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { loadingStore } from "@/store/loadingStore/loadingStore";

const GlobalLoader = () => {
  const activeRequests = loadingStore((state) => state.activeRequests);

  const [isVisible, setIsVisible] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const isLoading = activeRequests > 0;

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(false);
      setLoadingMessage("Loading...");
      return;
    }

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const timer1 = setTimeout(() => {
      setLoadingMessage("Waking up the server...");
    }, 3000);

    const timer2 = setTimeout(() => {
      setLoadingMessage("The server is taking a little longer than usual...");
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoading]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-8 py-6 shadow-xl">
        <Loader2 className="h-7 w-7 animate-spin" />

        <p className="text-sm text-gray-700">{loadingMessage}</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
