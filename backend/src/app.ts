import express from "express";
import cors from "cors";
import questRoutes from "./routes/questRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.middleware";
import achivmentRoutes from "./routes/achivmentRoutes";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use(authMiddleware);
app.use("/user", userRoutes);
app.use("/quests", questRoutes);
app.use("/achivment", achivmentRoutes);

export default app;
