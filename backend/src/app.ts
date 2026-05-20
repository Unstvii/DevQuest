import express from "express";
// import questRoutes from "./routes/questRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
// app.use("/quests", questRoutes);

export default app;
