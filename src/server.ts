import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados
connectDB();

// Iniciar o servidor
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    console.log('Process terminated!');
  });
});
