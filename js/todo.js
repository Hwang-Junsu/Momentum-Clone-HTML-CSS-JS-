const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const toDoicon = document.getElementById("todo-icon");
const toDoBox = document.getElementById("todo-box");
const toDoBoxButton = document.getElementsByClassName("toDoBoxButton");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function clickTodoButton() {
  if (toDoBox.classList.contains("slowly_appear")) {
    toDoBox.classList.add("slowly_hidden");
    toDoBox.classList.remove("slowly_appear");
  } else if (toDoBox.classList.contains("slowly_hidden")) {
    toDoBox.classList.remove("slowly_hidden");
    toDoBox.classList.add("slowly_appear");
  }
}

function hiddenTodoBox() {
  if (window.innerWidth < 1000 || window.innerHeight < 600) {
    toDoBox.classList.add("hidden");
  } else {
    toDoBox.classList.remove("hidden");
  }
}

toDoicon.addEventListener("click", clickTodoButton);
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

window.addEventListener("resize", hiddenTodoBox);
