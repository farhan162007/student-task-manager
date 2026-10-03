const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskList = document.getElementById("task-list");

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

    // Create completion checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.setAttribute("aria-label", "Mark task as completed");

    // Create task content
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskName = document.createElement("span");
    taskName.classList.add("task-title");
    taskName.textContent = title;

    const taskDetails = document.createElement("p");
    taskDetails.classList.add("task-description");
    taskDetails.textContent = description;

    taskContent.appendChild(taskName);
    taskContent.appendChild(taskDetails);

    // Mark task as completed or active
    checkbox.addEventListener("change", function () {
        taskItem.classList.toggle("completed", checkbox.checked);
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        taskItem.remove();
    });

    // Add elements to task
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);

    // Display task
    taskList.appendChild(taskItem);

    // Clear form
    taskForm.reset();
});
