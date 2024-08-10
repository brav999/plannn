const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/task');

const app = express();
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Endpoint para adicionar tarefa
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        const savedTask = await task.save();
        res.send(savedTask);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Endpoint para obter todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Endpoint para atualizar uma tarefa
app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedTask);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});