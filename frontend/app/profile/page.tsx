import UserProfile from "@/components/UserProfile/UserProfile";
import React from "react";

const page = () => {
  return (
    <div
      className="w-full h-screen"
      style={{ background: "var(--color-bg-base)" }}
    >
      <UserProfile />
    </div>
  );
};

export default page;
