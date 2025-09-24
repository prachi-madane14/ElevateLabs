// Select elements
const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create task item
  const li = document.createElement("li");
  li.className = "task-item";

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Toggle complete on click
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  // Append elements
  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";
}

// Add button event
addBtn.addEventListener("click", addTask);

// Enter key also adds task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
