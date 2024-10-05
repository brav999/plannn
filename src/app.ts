// src/app.ts
import dotenv from "dotenv";
import express from "express";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Rotas
app.use("/api/tasks", taskRoutes);

export default app;
