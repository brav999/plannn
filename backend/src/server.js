const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Task = require("./models/task");
const cors = require("cors");
const task = require("./models/task");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
mongoose
  .connect(
    "mongodb+srv://bravlima:8SsizsUuSKcOHcKR@cluster0.1nqof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Endpoint para adicionar tarefa
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    const savedTask = await task.save();
    res.status(201).send(savedTask);
  } catch (err) {
    res.status(400).send(err);
  }
  console.log(req.body);
});

// Endpoint para obter todas as tarefas
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Endpoint para atualizar uma tarefa
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updatedTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/delete-task/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: "Dados de teste removidos com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message: "Erro ao remover dados de teste",
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
