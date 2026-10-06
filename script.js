const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskList = document.getElementById("task-list");

const taskSearch = document.getElementById("task-search");
const noTasksMessage = document.getElementById("no-tasks-message");




function filterTasks() {
    const searchText = taskSearch.value.trim().toLowerCase();

    const tasks = taskList.querySelectorAll(".task");

    let visibleTasks = 0;

    tasks.forEach(function (task) {

        const titleElement = task.querySelector(".task-title");
        const descriptionElement = task.querySelector(".task-description");

        const title = titleElement
            ? titleElement.textContent.toLowerCase()
            : "";

        const description = descriptionElement
            ? descriptionElement.textContent.toLowerCase()
            : "";

        const taskText = title + " " + description;

        // Show matching task
        if (taskText.includes(searchText)) {

            task.style.display = "";

            visibleTasks++;

        }

        // Hide non-matching task
        else {

            task.style.display = "none";

        }
    });


    // Show "No tasks found" message
    if (searchText !== "" && visibleTasks === 0) {

        noTasksMessage.hidden = false;

    } else {

        noTasksMessage.hidden = true;

    }
}


// Run search whenever user types
taskSearch.addEventListener("input", function () {
    filterTasks();
});


// ===============================
// ADD NEW TASK
// ===============================

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();


    if (title === "") {

        alert("Please enter a task title.");

        return;
    }


    // Create task
    const taskItem = document.createElement("li");

    taskItem.classList.add("task");


    // ===============================
    // CHECKBOX
    // ===============================

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.classList.add("task-checkbox");

    checkbox.setAttribute(
        "aria-label",
        "Mark task as completed"
    );


    // ===============================
    // TASK CONTENT
    // ===============================

    const taskContent = document.createElement("div");

    taskContent.classList.add("task-content");


    // Task title
    const taskName = document.createElement("span");

    taskName.classList.add("task-title");

    taskName.textContent = title;


    // Task description
    const taskDetails = document.createElement("p");

    taskDetails.classList.add("task-description");

    taskDetails.textContent = description;


    taskContent.appendChild(taskName);

    taskContent.appendChild(taskDetails);


    // ===============================
    // COMPLETED TASK
    // ===============================

    checkbox.addEventListener("change", function () {

        taskItem.classList.toggle(
            "completed",
            checkbox.checked
        );

    });


    // ===============================
    // DELETE BUTTON
    // ===============================

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-button");


    deleteButton.addEventListener("click", function () {

        taskItem.remove();

        filterTasks();

    });


    // ===============================
    // ADD ELEMENTS TO TASK
    // ===============================

    taskItem.appendChild(checkbox);

    taskItem.appendChild(taskContent);

    taskItem.appendChild(deleteButton);


    // Add task to list
    taskList.appendChild(taskItem);


    // Clear form
    taskForm.reset();


    // Apply current search
    filterTasks();

});


// ===============================
// INITIAL FILTER
// ===============================

filterTasks();
