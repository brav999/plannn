let tasks = [];

function showToast(message) {
    const toastContainer = document.querySelector('.toast-container');

    // Cria um novo elemento toast
    const toast = document.createElement('div');
    toast.className = 'toast';

    // Cria a barra de progresso
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // Adiciona a mensagem e a barra de progresso ao toast
    toast.innerHTML = message;
    toast.appendChild(progressBar);

    // Adiciona o toast à tela
    toastContainer.appendChild(toast);

    // Mostra o toast e inicia a barra de progresso
    setTimeout(() => {
        toast.classList.add('show');
        // Inicia a barra de progresso
        progressBar.style.transform = 'scaleX(1)';
    }, 10);

    // Tempo que o toast fica visível
    const displayDuration = 3000;

    // Remove o toast após um tempo
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');

        // Remove o toast do DOM após a animação
        setTimeout(() => {
            toast.remove();
        }, 500); // Tempo deve corresponder à duração da animação
    }, displayDuration); // Tempo que o toast fica visível
}

function addTask() {
    const taskName = document.getElementById('taskName').value.trim();
    if (taskName === '') return showToast('Por favor, insira o nome da tarefa.');

    const existingTask = tasks.find(task => task.name === taskName);
    if (existingTask) {
        showToast('Essa tarefa já existe. Você pode continuar a tarefa na lista abaixo.');
        return;
    }

    const task = {
        id: tasks.length + 1,
        name: taskName,
        totalTime: 0,
        startTime: null,
    };
    tasks.push(task);
    renderTasks();
    document.getElementById('taskName').value = '';
}

function cleanTasks() {
    tasks = [];
    if (tasks.length === 0) {
        showToast('Não há tarefas para limpar.');
    }
    renderTasks();
}

function exit() {
    tasks = [];
    window.location.href = "login.html";
}

function startTask(index) {
    const task = tasks[index];

    // Verifica se a tarefa já está em andamento
    if (task.startTime) {
        showToast('A tarefa já está em andamento.');
        return;
    }

    // Define o tempo de início da tarefa
    task.startTime = new Date();

    // Inicia a atualização em tempo real do tempo da tarefa
    task.intervalId = setInterval(() => {
        const now = new Date();
        const elapsedTime = Math.floor((now - task.startTime) / 1000); // Tempo em segundos
        task.totalTime += elapsedTime; // Atualiza o totalTime da tarefa acumulando o tempo decorrido
        task.startTime = now; // Atualiza o tempo de início para o momento atual
        renderTasks(); // Atualiza a interface
    }, 1000); // Atualiza a cada 1 segundo

    // Atualiza a interface imediatamente para mostrar o tempo inicial
    renderTasks();
}

function stopTask(index) {
    const task = tasks[index];

    // Verifica se a tarefa está em andamento
    if (!task.startTime) {
        showToast('A tarefa ainda não foi iniciada.');
        return;
    }

    // Para o intervalo de atualização em tempo real
    clearInterval(task.intervalId);

    // Calcula o tempo decorrido
    const endTime = new Date();
    const timeDiff = Math.floor((endTime - task.startTime) / 1000); // Tempo em segundos

    // Atualiza o totalTime da tarefa
    task.totalTime += timeDiff;

    // Limpa o tempo de início e o intervalo
    task.startTime = null;
    task.intervalId = null; // Limpa o ID do intervalo

    // Atualiza a interface
    renderTasks();
}

function updateTaskTime(index) {
    const task = tasks[index];
    const now = new Date();
    const elapsedTime = Math.floor((now - task.startTime) / 1000); // tempo em segundos

    task.totalTime = elapsedTime; // Atualiza o totalTime da tarefa
    renderTasks(); // Atualiza a interface

    // Configura o próximo update para daqui a 1 segundo
    task.intervalId = setInterval(() => {
        const now = new Date();
        const elapsedTime = Math.floor((now - task.startTime) / 1000); // tempo em segundos
        task.totalTime = elapsedTime; // Atualiza o totalTime da tarefa
        renderTasks(); // Atualiza a interface
    }, 1000);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        const taskId = document.createElement('td');
        taskId.textContent = task.id;
        row.appendChild(taskId);

        const nameCell = document.createElement('td');
        nameCell.textContent = task.name;
        row.appendChild(nameCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = formatTime(task.totalTime);
        row.appendChild(timeCell);

        const actionCell = document.createElement('td');

        const startButton = document.createElement('button');
        startButton.textContent = 'Iniciar';
        startButton.onclick = () => startTask(index);
        actionCell.appendChild(startButton);

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Pausar';
        stopButton.className = 'stop';
        stopButton.onclick = () => stopTask(index);
        actionCell.appendChild(stopButton);

        row.appendChild(actionCell);

        // Verificar se a tarefa está ativa
        if (task.startTime) {
            row.className = 'active-task';
        }

        taskList.insertBefore(row, taskList.firstChild);
    });
}

