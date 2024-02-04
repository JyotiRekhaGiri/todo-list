let inputs = document.getElementById("inp");
let text = document.querySelector(".text");
let completedTaskCount = document.getElementById("completedTaskCount");
let totalTaskCount = document.getElementById("totalTaskCount");
let clipboardImage = document.getElementById("clipboardImage");

let totalTasks = 0;
let completedTasks = 0;

function Add() {
    // Your existing code for adding tasks
    if (inputs.value == "") {
        clipboardImage.style.display = "block";
        return;
    } else {
        
        let newEle = document.createElement("ul");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        newEle.appendChild(checkbox);
        newEle.innerHTML = `${inputs.value} <i class="fa-solid fa-trash"></i>`;
        text.appendChild(newEle);
        inputs.value = "";
        newEle.querySelector("i").addEventListener("click", remove);
        newEle.querySelector("input[type='checkbox']").addEventListener("change", updateCompletedCount);
        totalTasks++;
        totalTaskCount.textContent = totalTasks;
        function remove() {
            newEle.remove()
        }

        function updateCompletedCount() {
            if (this.checked) {
                completedTasks++;
            } else {
                completedTasks--;
            }
            completedTaskCount.textContent = completedTasks;
        }
        // New code to integrate the provided script
        addTask(); // Call the function to add tasks from the provided script
    }
}

function remove() {
    let checkbox = this.parentElement.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
        completedTasks--;
        completedTaskCount.textContent = completedTasks;
    }
    totalTasks--;
    totalTaskCount.textContent = totalTasks;
    this.parentElement.remove();
}

function updateCompletedCount() {
    if (this.checked) {
        completedTasks++;
    } else {
        completedTasks--;
    }
    completedTaskCount.textContent = completedTasks;
}

// Provided script encapsulated inside a function
function addTask() {
    // Add task button click event listener
    document.getElementById('addTaskBtn').addEventListener('click', addTask);

    // Counters for tasks
    let totalTasks = 0;
    let completedTasks = 0;

    function updateNoItemsMessage() {
        const noItemsMessage = document.getElementById('noItemsImage');
        const taskList = document.getElementById('taskList');
        const taskCount = document.getElementById('taskCount');
        const highPriorityCount = document.getElementById('highPriorityCount');

        if (totalTasks === 0 && completedTasks === 0) {
            noItemsMessage.style.display = 'block';
            taskList.style.display = 'none';
        } else {
            noItemsMessage.style.display = 'none';
            taskList.style.display = 'block';
        }
    }

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const taskCount = document.getElementById('taskCount');
        const highPriorityCount = document.getElementById('highPriorityCount');
        const box = document.getElementById('box');

        // Get the task name from the input
        const taskName = taskInput.value.trim();
        updateNoItemsMessage();

        if (taskName !== '') {
            // Create a new task element
            const taskElement = document.createElement('div');
            taskElement.className = 'task';

            // Create a checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';

            // Create a span for the task name
            const taskSpan = document.createElement('span');
            taskSpan.className = 'task-name';
            taskSpan.textContent = taskName;

            // Create a delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-task-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

            // Append elements to the task element
            taskElement.appendChild(checkbox);
            taskElement.appendChild(taskSpan);
            taskElement.appendChild(deleteBtn);

            // Append the task element to the task list
            taskList.appendChild(taskElement);

            // Increment the task count
            totalTasks++;
            taskCount.textContent = `${completedTasks} of ${totalTasks}`;
            highPriorityCount.textContent = `${completedTasks} of ${totalTasks}`;

            // Clear the input field
            taskInput.value = '';

            // Add event listener to the delete button
            deleteBtn.addEventListener('click', function () {
                if (checkbox.checked) {
                    // If the deleted task was completed, decrement the completedTasks count
                    completedTasks--;
                }
                taskElement.remove();
                totalTasks--;
                taskCount.textContent = `${completedTasks} of ${totalTasks}`;
                highPriorityCount.textContent = `${completedTasks} of ${totalTasks}`;
                updateNoItemsMessage(); // Update message after task deletion
                updateBox(); // Update the box content after task deletion
            });

            // Add event listener to the checkbox
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    // Update completed tasks count
                    completedTasks++;
                } else {
                    // Update completed tasks count when unchecked
                    completedTasks--;
                }

                // Update task count display
                taskCount.textContent = `${completedTasks} of ${totalTasks}`;
                highPriorityCount.textContent = `${completedTasks} of ${totalTasks}`;
            });

            updateNoItemsMessage();
            updateBox(); // Update the box content after adding a task
        }
    }

    function updateBox() {
        const box = document.getElementById('box');
        const taskList = document.getElementById('taskList');
        if (taskList.children.length === 0) {
            // If the task list is empty, show the clipboard image
            box.innerHTML = `
                <div id="noItemsImage" class="no-items">
                    <!--Add the image source as per your requirement -->
                    <img src="./image/Clipboard.png" alt="No Items Image">
                    <p>You have no To-do Items As of now</p>
                </div>
            `;
        } else {
            // If the task list is not empty, show the tasks inside the box
            box.innerHTML = '';
            taskList.childNodes.forEach(task => {
                box.appendChild(task.cloneNode(true));
            });
        }
    }
}
