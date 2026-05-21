import express from "express";
// import questRoutes from "./routes/questRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.middleware";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use(authMiddleware);
app.use("/user", userRoutes);

// app.use("/quests", questRoutes);

export default app;
