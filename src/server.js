// src/server.js
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados
connectDB();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
