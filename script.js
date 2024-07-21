document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    if (taskText.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    // Assign an onclick event to remove the list item
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
      removeTaskFromLocalStorage(taskText);
    };

    // Append the remove button to the list item
    listItem.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Clear the task input field
    taskInput.value = "";

    // Save the task to Local Storage
    if (save) {
      saveTaskToLocalStorage(taskText);
    }
  }

  // Function to save a task to Local Storage
  function saveTaskToLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Function to remove a task from Local Storage
  function removeTaskFromLocalStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Event listener for the Add Task button
  addButton.addEventListener("click", function () {
    addTask(taskInput.value);
  });

  // Event listener for pressing Enter key in the input field
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask(taskInput.value);
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});
