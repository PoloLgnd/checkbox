document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('tasks');
    
    loadTasks();
    
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Создание элемента задачи
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });
        
        // Обработчик изменения состояния чекбокса
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                textSpan.classList.add('completed');
                taskList.appendChild(taskItem);
            } else {
                textSpan.classList.remove('completed');
                taskList.insertBefore(taskItem, taskList.firstChild);
            }
            saveTasks();
        });
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(textSpan);
        taskItem.appendChild(deleteBtn);
        
        taskList.insertBefore(taskItem, taskList.firstChild);
        
        taskInput.value = '';
        
        saveTasks();
    }
});