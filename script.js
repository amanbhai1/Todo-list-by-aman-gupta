let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on page load
displayTasks();

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText !== '') {
        // Create task object
        let task = {
            text: taskText
        };
        // Add task to tasks array
        tasks.push(task);
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Display updated tasks
        displayTasks();
        // Clear input field
        taskInput.value = '';
    }
}

function deleteTask(element) {
    let listItem = element.parentElement.parentElement;
    let index = Array.from(listItem.parentElement.children).indexOf(listItem);
    // Remove task from tasks array
    tasks.splice(index, 1);
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Display updated tasks
    displayTasks();
}

function editTask(element) {
    let listItem = element.parentElement.parentElement;
    let taskText = listItem.querySelector('.task-text').textContent;
    let newTaskText = prompt('Edit task:', taskText);
    if (newTaskText !== null) {
        listItem.querySelector('.task-text').textContent = newTaskText;
        let index = Array.from(listItem.parentElement.children).indexOf(listItem);
        // Update task text in tasks array
        tasks[index].text = newTaskText;
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="button-group">
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}
