import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import taskRoutes from './routes/taskRoutes';
import errorMiddleware from './middleware/errorMiddleware';
import { notFoundMiddleware } from './middleware/notFoundMiddleware';

// Carregar variáveis de ambiente no início
dotenv.config();

const app: Application = express();

// Configuração básica de segurança
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requisições por janela
});

// Middlewares
app.use(helmet()); // Segurança
app.use(cors()); // Habilitar CORS
app.use(morgan('dev')); // Logging
app.use(compression()); // Compressão de resposta
app.use(express.json({ limit: '10kb' })); // Limitar tamanho do payload
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(limiter); // Rate limiting

// Middleware para adicionar timestamp na requisição
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Rotas
app.use('/api/v1/tasks', taskRoutes);

// Tratamento para rotas não encontradas
app.use(notFoundMiddleware);

// Middleware de erro global
app.use(errorMiddleware);

// Tratamento de erros não capturados
process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

export default app;