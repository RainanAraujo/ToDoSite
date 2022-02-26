const toDo = document.querySelectorAll(".toDo");
const wrapperToDos = document.querySelectorAll(".wrapperToDos");
const contentToDosList = document.getElementById("contentToDosList");

contentToDosList.addEventListener("wheel", (e) => {
  e.preventDefault();
  contentToDosList.scrollBy({
    left: e.deltaY < 0 ? 30 : -30,
  });
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
