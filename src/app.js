// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());

// Rotas
app.use("/api/tasks", taskRoutes);

module.exports = app;
