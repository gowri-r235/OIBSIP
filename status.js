let tasks = [];
let completedTasks = [];

document.addEventListener("DOMContentLoaded", function() {
    const addTaskForm = document.getElementById("add-task-form");
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const pendingTasksList = document.getElementById("pending-tasks");
    const completedTasksList = document.getElementById("completed-tasks");

    addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const task = taskInput.value.trim();
        if (task !== "") {
            const taskObj = {
                id: Date.now(),
                task: task,
                completed: false,
                timestamp: new Date().toLocaleString()
            };
            tasks.push(taskObj);
            taskInput.value = "";
            renderTasks();
        }
    });

    pendingTasksList.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            const taskId = event.target.dataset.id;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = true;
                completedTasks.push(tasks.splice(taskIndex, 1)[0]);
                renderTasks();
            }
        }
    });

    completedTasksList.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            const taskId = event.target.dataset.id;
            const taskIndex = completedTasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                completedTasks.splice(taskIndex, 1);
                renderTasks();
            }
        }
    });

    function renderTasks() {
        pendingTasksList.innerHTML = "";
        completedTasksList.innerHTML = "";

        tasks.forEach(task => {
            const taskListItem = document.createElement("LI");
            taskListItem.textContent = `${task.task} - ${task.timestamp}`;
            taskListItem.dataset.id = task.id;
            pendingTasksList.appendChild(taskListItem);
        });

        completedTasks.forEach(task => {
            const taskListItem = document.createElement("LI");
            taskListItem.textContent = `${task.task} - ${task.timestamp}`;
            taskListItem.dataset.id = task.id;
            completedTasksList.appendChild(taskListItem);
        });
    }
});