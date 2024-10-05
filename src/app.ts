// src/app.ts
import dotenv from 'dotenv';
import express from 'express';
import errorMiddleware from './middleware/errorMiddleware';
import { router } from './routes/taskRoutes';

dotenv.config();

const app = express();

app.use(express.json());

// Rotas
app.use('/api/tasks', router);

app.use(errorMiddleware);

export default app;
