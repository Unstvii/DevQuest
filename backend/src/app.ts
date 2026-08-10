import express from "express";
import cors from "cors";
import questRoutes from "./routes/questRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

app.use("/auth", authRoutes);
app.use(authMiddleware); // Add authentication middleware for all routes
app.use("/user", userRoutes);
app.use("/quests", questRoutes);

export default app;
