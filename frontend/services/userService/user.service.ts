import api from "../axios";

interface UserProfileResponse {
  email: string;
  username: string;
  xp: number;
  level: number;
}

export const userService = {
  getMe: async (): Promise<UserProfileResponse> => {
    const response = await api.get<UserProfileResponse>("/user");
    return response.data;
  },
};
