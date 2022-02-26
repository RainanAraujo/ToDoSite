const toDo = document.querySelectorAll(".toDo");
const wrapperToDos = document.querySelectorAll(".wrapperToDos");
const contentToDosList = document.getElementById("contentToDosList");

contentToDosList.addEventListener("wheel", (event) => {
  event.preventDefault();

  contentToDosList.scrollBy({
    left: event.deltaY < 0 ? -30 : 30,
  });
});

toDo.forEach((card) => {
  card.addEventListener("dragstart", toDoDragStart);
  card.addEventListener("dragend", toDoDragEnd);
});

wrapperToDos.forEach((wrapperToDos) => {
  wrapperToDos.addEventListener("dragover", wrapperDragOver);
  wrapperToDos.addEventListener("dragleave", wrapperDragLeave);
  wrapperToDos.addEventListener("drop", wrapperDragLeave);
});

function toDoDragStart() {
  this.classList.add("dragging");
}

function toDoDragEnd() {
  this.classList.remove("dragging");
}

function wrapperDragOver(e) {
  e.preventDefault();
  this.classList.add("wrapperToDosDrawable");
  this.appendChild(document.querySelector(".dragging"));
}

function wrapperDragLeave() {
  this.classList.remove("wrapperToDosDrawable");
}
