"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth/auth.store";
import { userService } from "@/services/userService/user.service";

export default function AuthInitializer() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await userService.getUserInfo();

        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [setIsAuthenticated]);

  return null;
}
