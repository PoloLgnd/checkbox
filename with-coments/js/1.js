document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('tasks');
    
    // Загрузка задач из localStorage
    loadTasks();
    
    // Добавление новой задачи
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
                // Перемещаем выполненную задачу в конец списка
                taskList.appendChild(taskItem);
            } else {
                textSpan.classList.remove('completed');
                // Возвращаем задачу в начало списка
                taskList.insertBefore(taskItem, taskList.firstChild);
            }
            saveTasks();
        });
        
        // Сборка элемента
        taskItem.appendChild(checkbox);
        taskItem.appendChild(textSpan);
        taskItem.appendChild(deleteBtn);
        
        // Добавление в начало списка
        taskList.insertBefore(taskItem, taskList.firstChild);
        
        // Очистка поля ввода
        taskInput.value = '';
        
        // Сохранение задач
        saveTasks();
    }
    
    // Сохранение задач в localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(task => {
            tasks.push({
                text: task.querySelector('.task-text').textContent,
                completed: task.querySelector('.task-checkbox').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Загрузка задач из localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(task => {
                taskInput.value = task.text;
                addTask();
                
                const lastTask = taskList.firstChild;
                lastTask.querySelector('.task-checkbox').checked = task.completed;
                if (task.completed) {
                    lastTask.querySelector('.task-text').classList.add('completed');
                    // Перемещаем выполненную задачу в конец списка
                    taskList.appendChild(lastTask);
                }
            });
            taskInput.value = '';
        }
    }
});