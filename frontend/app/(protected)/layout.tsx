import React from "react";
import AuthGuard from "@/services/authGuard/authGuard";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};
export default ProtectedLayout;
