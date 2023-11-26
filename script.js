document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = taskInput.value.trim();

    if (newTask !== '') {
        taskList.push({ description: newTask, completed: false });
        localStorage.setItem('tasks', JSON.stringify(taskList));
        taskInput.value = '';
        renderTasks();
    } else {
        alert('Task description cannot be empty!');
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleCompletion(${index})">
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedDescription = prompt('Edit task:', tasks[index].description);

    if (updatedDescription !== null) {
        tasks[index].description = updatedDescription.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
