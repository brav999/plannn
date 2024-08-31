// src/app.js
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());

// Rotas
app.use("/api/tasks", taskRoutes);

module.exports = app;
