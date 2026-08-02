import api from "../axios";

interface UserProfileResponse {
  email: string;
  username: string;
  xp: number;
  level: number;
  streak: number;
}
export type UserRating = Pick<
  UserProfileResponse,
  "username" | "level" | "streak"
>;

export const userService = {
  getMe: async (): Promise<UserProfileResponse> => {
    const response = await api.get<UserProfileResponse>("/user");
    return response.data;
  },
  getRating: async (): Promise<UserRating[]> => {
    const response = await api.get<UserRating[]>("/user/usersRating");
    return response.data;
  },
};
