"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/axios";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/user");
        setLoading(false);
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return null;
  }

  return children;
}
