


//////// For displaying the tasks after pressing enter

function addTodo(event) {
    if (event.key === 'Enter') {
        const inputBox = document.getElementById('input-box');
        const taskList = document.getElementById('task-list');
        const listsDiv = document.querySelector('.lists');


        const inputValue = inputBox.value.trim();
        if (inputValue === '') {
            return alert('Enter something');
        }


        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const label = document.createElement('label');
        label.textContent = inputValue;
        label.className = 'editable';
        label.addEventListener('dblclick', function () {
            this.contentEditable = true;
            this.focus();
        });

        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = 'X';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(taskContainer);
            updateTaskCount();

            // Checking if there are no tasks left, then hide the lists
            if (taskList.children.length === 0) {
                listsDiv.style.display = 'none';
                hideSelectAllArrow();
            }
        });

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(label);
        taskContainer.appendChild(deleteBtn);
        taskList.appendChild(taskContainer);

        inputBox.value = '';
        updateTaskCount();

        // Checking if there are tasks, then display the lists else hide the the lists
        if (taskList.children.length > 0) {
            listsDiv.style.display = 'block';
            showSelectAllArrow();
        } else {
            listsDiv.style.display = 'none';
            hideSelectAllArrow();
        }
    }
}



/////// For displaying arrow
function showSelectAllArrow() {
    const selectAllArrow = document.querySelector('.select-all');
    if (selectAllArrow) {
        selectAllArrow.style.display = 'inline-block';
    }
}



/////// For hiding the arrow 
function hideSelectAllArrow() {
    const selectAllArrow = document.querySelector('.select-all');
    if (selectAllArrow) {
        selectAllArrow.style.display = 'none';
    }
}



/////// For selecting all tasks 
function selectAllTasks() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
}




/////// For showing all tasks 
function showAllTasks() {
    const taskList = document.getElementById('task-list');
    const taskContainers = taskList.children;

    for (const taskContainer of taskContainers) {
        taskContainer.style.display = 'block';
    }
    updateTaskCount();
}




// For showing active tasks
function showActiveTasks() {
    const taskList = document.getElementById('task-list');
    const taskContainers = taskList.children;

    for (const taskContainer of taskContainers) {
        const checkbox = taskContainer.querySelector('.task-checkbox');
        if (checkbox && !checkbox.checked) {
            taskContainer.style.display = 'block';
        } else {
            taskContainer.style.display = 'none';
        }
    }
    updateTaskCount();
}




// For showing completed tasks
function showCompletedTasks() {
    const taskList = document.getElementById('task-list');
    const taskContainers = taskList.children;

    for (const taskContainer of taskContainers) {
        const checkbox = taskContainer.querySelector('.task-checkbox');
        if (checkbox && checkbox.checked) {
            taskContainer.style.display = 'block';
        } else {
            taskContainer.style.display = 'none';
        }
    }
    updateTaskCount();
}




////////// For deleting all the selected tasks
function clearCompleted() {
    const taskList = document.getElementById('task-list');
    const completedTasks = taskList.querySelectorAll('.task-container input:checked');

    completedTasks.forEach(function (completedTask) {
        const taskContainer = completedTask.closest('.task-container');
        taskList.removeChild(taskContainer);
    });

    updateTaskCount();

    if (taskList.children.length === 0) {
        const listsDiv = document.querySelector('.lists');
        listsDiv.style.display = 'none';

        hideSelectAllArrow();
    }
}





///////// Counting the number of tasks
function updateTaskCount() {
    const taskList = document.getElementById('task-list');
    const totalTasks = taskList.children.length;
    const completedTasks = document.querySelectorAll('.task-container input:checked').length;
    const activeTasks = totalTasks - completedTasks;
    const itemsCountElement = document.getElementById('items-left');
    if (itemsCountElement) {
        itemsCountElement.textContent = `${activeTasks} item${activeTasks !== 1 ? 's' : ''} left`;
    }
}
