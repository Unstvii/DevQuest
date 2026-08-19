import api from "../axios";

export const achivmentService = {
  getAllAchivment: () => {
    return api.get("/achivment");
  },
};
