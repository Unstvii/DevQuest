import prisma from "../prisma/prismaClient";

class achivmentService {
  getAllAchivment = async () => {
    const achievement = await prisma.achievement.findMany();
    return achievement;
  };
}

export default achivmentService;
