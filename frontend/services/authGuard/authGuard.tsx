"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/auth.store";
import AuthSkeleton from "@/components/AuthSkeleton/AuthSkeleton";
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading) {
    return <AuthSkeleton />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
