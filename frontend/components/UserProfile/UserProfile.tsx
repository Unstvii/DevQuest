"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth/auth.store";

import { userService } from "@/services/userService/user.service";
import { useUserStore } from "@/store/user/userProfile.store";

const UserProfile = () => {
  const { accessToken } = useAuthStore();
  const { setUserProfile, clearUserProfile, username, email, xp, level } =
    useUserStore();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(accessToken);
        const user = await userService.getMe(accessToken);
        setUserProfile(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        clearUserProfile();
      }
    };

    fetchUser();
  }, [accessToken]);
  return (
    <div className="pt-4">
      <div className="flex justify-center">Profile</div>
      <div className="w-1/2 mx-auto p-4">
        <div className="">Nickname: {username}</div>
        <div className="">Email: {email}</div>
        <div className="">XP: {xp}</div>
        <div className="">Level: {level}</div>
      </div>
    </div>
  );
};

export default UserProfile;
