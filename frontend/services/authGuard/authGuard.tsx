"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/auth.store";
import AuthSkeleton from "@/components/AuthSkeleton/AuthSkeleton";
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading || !isAuthenticated) {
    return <div className="min-h-screen bg-[var(--color-bg)]" />;
  }

  return children;
};
export default AuthGuard;
