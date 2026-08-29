import "dotenv/config";
import app from "./app";
import prisma from "./prisma/prismaClient";

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
