const trackerInput = document.getElementById("tracker-input");
const trackerBtn = document.getElementById("tracker-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

function saveData() {
  localStorage.setItem("trackerTasks", JSON.stringify(tasks));
}

function loadData() {
  const savedTasks = localStorage.getItem("trackerTasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });
  }
}

function createTaskElement(taskObj) {
  const newLi = document.createElement("li");
  newLi.classList.add("tracker-li");

  if (taskObj.completed) {
    newLi.classList.add("completed");
  }

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskObj.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  newLi.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      newLi.classList.toggle("completed");
      taskObj.completed = !taskObj.completed;
      saveData();
    }
  });

  deleteBtn.addEventListener("click", () => {
    newLi.remove();
    tasks = tasks.filter((t) => t.id !== taskObj.id);
    saveData();
  });

  newLi.appendChild(taskSpan);
  newLi.appendChild(deleteBtn);

  return newLi;
}

function handleAddTask() {
  const taskText = trackerInput.value.trim();

  if (taskText === "") return;

  const newTaskObj = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTaskObj);
  saveData();

  const newTaskElement = createTaskElement(newTaskObj);
  taskList.appendChild(newTaskElement);

  trackerInput.value = "";
}

trackerBtn.addEventListener("click", handleAddTask);

trackerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});

loadData();
