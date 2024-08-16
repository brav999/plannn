const task = require("../api/models/task");
const task = require("../api/models/task");
const task = require("../api/models/task");
const task = require("../api/models/task");
const task = require("../api/models/task");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

async function addTask() {
  const taskName = document.getElementById("taskName").value.trim();
  if (taskName === "") return showToast("Por favor, insira o nome da tarefa.");

  const existingTask = tasks.find((task) => task.name === taskName);
  if (existingTask) {
    showToast(
      "Essa tarefa já existe. Você pode continuar a tarefa na lista abaixo."
    );
    return;
  }

  const task = {
    id: length + 1,
    name: taskName,
    responsible: taskName,
    totalTime: task.totalTime,
    startTime: task.startTime,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: taskDeletedAt,
  };

  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Erro na resposta da API");

    const newTask = await response.json();
    task.push(newTask);
    renderTasks();
    document.getElementById("taskName").value = "";
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
}

function cleanTasks() {}

function startTask(index) {
  const task = tasks[index];
  if (task.startTime) {
    showToast("A tarefa já está em andamento.");
    return;
  }
  task.startTime = new Date();
  saveTasks();
  renderTasks();
}

function stopTask(index) {
  const task = tasks[index];
  if (!task.startTime) {
    showToast("A tarefa ainda não foi iniciada.");
    return;
  }
  const endTime = new Date();
  const timeDiff = (endTime - task.startTime) / 1000;
  task.totalTime += timeDiff;
  task.startTime = null;
  saveTasks();
  renderTasks();
}

function showToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.innerText = mensagem;
  toast.className = "show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000); // O toast ficará visível por 3 segundos
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    const id = document.createElement("td");
    id.textContent = task.id;
    row.appendChild(id);

    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    const timeCell = document.createElement("td");
    timeCell.textContent = formatTime(task.totalTime);
    row.appendChild(timeCell);

    const actionCell = document.createElement("td");

    const startButton = document.createElement("button");
    startButton.textContent = "Início";
    startButton.onclick = () => startTask(index);
    actionCell.appendChild(startButton);

    const stopButton = document.createElement("button");
    stopButton.textContent = "Fim";
    stopButton.className = "stop";
    stopButton.onclick = () => stopTask(index);
    actionCell.appendChild(stopButton);

    row.appendChild(actionCell);

    // Verificar se a tarefa está ativa
    if (task.startTime) {
      row.className = "active-task";
    }

    taskList.appendChild(row);
  });
}

// Inicializar renderização das tarefas ao carregar a página
document.addEventListener("DOMContentLoaded", renderTasks);
