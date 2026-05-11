import express from "express";
import questRoutes from "./routes/questRoutes";

const app = express();

app.use(express.json());

app.use("/quests", questRoutes);

export default app;
