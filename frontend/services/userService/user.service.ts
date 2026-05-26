import api from "../axios";

interface UserProfileResponse {
  email: string;
  username: string;
  xp: number;
  level: number;
}

export const userService = {
  getMe: async (accessToken: string | null): Promise<UserProfileResponse> => {
    if (!accessToken) {
      throw new Error("No access token provided");
    }
    const response = await api.get<UserProfileResponse>("/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  },
};
