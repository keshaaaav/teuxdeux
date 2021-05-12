const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".actualTodoList");
const inboxImg = document.querySelector(".inbox-img");
const viewTodoSection = document.querySelector(".toggleOff");
const addTodoSection = document.querySelector(".toggleOn");
const todoInput = document.querySelector(".todo-input");
const everything = document.querySelector("*");
const addButton = document.querySelector(".addButton");
const checkedTodoList = document.querySelector(".checkedTodoList");
const logbook = document.querySelector(".logbook");
const logbookSection = document.querySelector(".logbooksec");
const egg = document.querySelector(".easterEgg");

// WAYS TO ACCESS NEW TODO SECTION
document.onkeyup = function (e) {
  if (e.which == 27) {
    logbookSection.classList.toggle("hidden");
    addTodoSection.classList.toggle("hidden");
    // egg.classList.toggle("hidden");
    everything.classList.toggle("nonScrollable");
  } else if (e.ctrlKey && e.which == 76) {
    logbookSection.classList.toggle("hidden");
    everything.classList.toggle("nonScrollable");
  }
};

addButton.addEventListener("click", function () {
  addTodoSection.classList.toggle("hidden");
  everything.classList.toggle("nonScrollable");
});

// LISTNERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", del);
checkedTodoList.addEventListener("click", del);

function addTodo(event) {
  // console.log(todoInput);

  // MISC.
  event.preventDefault();
  inboxImg.classList.add("hidden");
  todoList.classList.remove("hidden");
  viewTodoSection.classList.remove("toggleOnOn");
  viewTodoSection.classList.add("toggleOffOff");
  logbookSection.classList.add("hidden");

  // CREATING TODO DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // COMPLETE BUTTON
  const completeButton = document.createElement("button");
  completeButton.innerHTML = `<img class="btnImg" src="./assets/checkbox.png">`;
  completeButton.classList.add("complete-button");
  todoDiv.appendChild(completeButton);

  // CREATING LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<img class="btnImg" src="./assets/trash.png">`;
  trashButton.classList.add("tash-button");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);

  // Togglling keys on add button too -- user is expected to hit esc key to go to the new todo section and expected to hit the add button to comeback
  addTodoSection.classList.toggle("hidden");
  everything.classList.toggle("nonScrollable");

  if (newTodo.innerText == "") {
    newTodo.innerText = "New To-Do";
  }

  if (newTodo.innerText == "New To-Do") {
    newTodo.classList.add("un-named-todo");
  }

  todoInput.value = "";
}

// the whole del function will executes when we press *anywhere* on the actual item, nothing will happen becuase there is actually nothing inside function del, only the if statement will execute but that has a condition of if the target location contains a class of tash-button

// so this means the whole function is nothing, has an if statement which says -- hey only execute me if the clicked location has a class of trash-button and i will remove trashbutton's parrent element

function del(e) {
  const item = e.target;
  if (item.classList.contains("tash-button")) {
    item.parentElement.classList.add("fallllll");
    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();

      if (todoList.childNodes.length == 0) {
        inboxImg.classList.remove("hidden");
        viewTodoSection.classList.add("toggleOnOn");
        todoList.classList.add("hidden");
      }
    });
  }

  if (item.classList.contains("complete-button")) {
    item.parentElement.classList.add("fallllll");
    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.classList.remove("fallllll");
      checkedTodoList.appendChild(item.parentElement);

      if (todoList.childNodes.length == 0) {
        item.parentElement.classList.add("checked-todo");
        item.classList.add("check-tos-button");
        inboxImg.classList.remove("hidden");
        viewTodoSection.classList.add("toggleOnOn");
        todoList.classList.add("hidden");
      }
    });
  }

  if (todoList.childNodes.length == 0) {
    inboxImg.classList.remove("hidden");
    viewTodoSection.classList.add("toggleOnOn");
    todoList.classList.add("hidden");
  }
}
