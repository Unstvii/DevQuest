import LoginForm from "@/components/Auth/LoginForm";
import React from "react";

const page = () => {
  return (
    <div
      className="w-full h-220"
      style={{ background: "var(--color-bg-base)" }}
    >
      <LoginForm />
    </div>
  );
};

export default page;
