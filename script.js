const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskList = document.getElementById("task-list");

const taskSearch = document.getElementById("task-search");
const noTasksMessage = document.getElementById("no-tasks-message");

// Search and filter tasks
function filterTasks() {
    const searchText = taskSearch.value.trim().toLowerCase();

    const tasks = taskList.querySelectorAll(".task");
    let visibleTasks = 0;

    tasks.forEach(function (task) {
        const title = task.querySelector(".task-title").textContent;
        const description = task.querySelector(".task-description").textContent;

        const taskText = (title + " " + description).toLowerCase();

        if (taskText.includes(searchText)) {
            task.hidden = false;
            visibleTasks++;
        } else {
            task.hidden = true;
        }
    });

    // Show message if search has no matching tasks
    noTasksMessage.hidden = !(searchText !== "" && visibleTasks === 0);
}

// Filter as the user types
taskSearch.addEventListener("input", filterTasks);

// Add a new task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    // Create task item
    const taskItem = document.createElement("li");
    taskItem.classList.add("task");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.setAttribute("aria-label", "Mark task as completed");

    // Create task content
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    // Create title
    const taskName = document.createElement("span");
    taskName.classList.add("task-title");
    taskName.textContent = title;

    // Create description
    const taskDetails = document.createElement("p");
    taskDetails.classList.add("task-description");
    taskDetails.textContent = description;

    taskContent.appendChild(taskName);
    taskContent.appendChild(taskDetails);

    // Toggle completed status
    checkbox.addEventListener("change", function () {
        taskItem.classList.toggle("completed", checkbox.checked);
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    // Delete task
    deleteButton.addEventListener("click", function () {
        taskItem.remove();
        filterTasks();
    });

    // Add elements to task
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);

    // Add task to list
    taskList.appendChild(taskItem);

    // Clear form
    taskForm.reset();

    // Reapply current search
    filterTasks();
});