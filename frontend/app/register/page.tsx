import React from "react";
import RegisterForm from "@/components/Auth/RegisterForm";
const page = () => {
  return (
    <div
      className="w-full h-220"
      style={{ background: "var(--color-bg-base)" }}
    >
      <RegisterForm />
    </div>
  );
};

export default page;
