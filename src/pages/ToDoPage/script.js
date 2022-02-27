const wrapperToDos = document.querySelectorAll(".wrapperToDos");
const modal = document.querySelector(".modal");
const addToDoButton = document.getElementById("addToDo");
const titleInput = document.getElementById("titleInput");
const mainToDoList = document.getElementById("mainToDoList");
const participantsInput = document.getElementById("participantsInput");
const buttonCloseModal = document.getElementById("buttonCloseModal");
const statusLengthList = document.getElementById("status");
var toDo = document.querySelectorAll(".toDo");

buttonCloseModal.addEventListener("click", () => {
  modal.style.display = "none";
});

addToDoButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

getColorDifficulty();
getCountToDoLists();
addEventListenerToDos();
function addEventListenerToDos() {
  toDo.forEach((card) => {
    card.addEventListener("dragstart", toDoDragStart);
    card.addEventListener("dragend", toDoDragEnd);
  });
}

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
  getCountToDoLists();
}

function wrapperDragLeave() {
  this.classList.remove("wrapperToDosDrawable");
}

function addNewTodo() {
  if (participantsInput.value != "" && titleInput.value != "") {
    const date = new Date();
    let difficulty;
    const newToDo = toDo[0].cloneNode(true);
    modal.style.display = "none";
    newToDo.childNodes[1].childNodes[1].textContent = titleInput.value;
    newToDo.childNodes[3].childNodes[1].textContent = participantsInput.value;
    newToDo.childNodes[5].childNodes[1].textContent =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    if (document.getElementById("radioEasy").checked) {
      difficulty = "Fácil";
    } else if (document.getElementById("radioNormal").checked) {
      difficulty = "Normal";
    } else {
      difficulty = "Difícil";
    }
    newToDo.childNodes[1].childNodes[3].childNodes[0].textContent = difficulty;
    mainToDoList.appendChild(newToDo);
    toDo = document.querySelectorAll(".toDo");
    addEventListenerToDos();
    participantsInput.value = "";
    titleInput.value = "";
    getCountToDoLists();
    getColorDifficulty();
  } else {
    alert("Preencha todos os campos.");
  }
}

function getCountToDoLists() {
  let countAllTodos = 0;
  wrapperToDos.forEach((wrapperToDos) => {
    countAllTodos += wrapperToDos.childElementCount;
  });
  statusLengthList.childNodes[1].childNodes[3].textContent =
    countAllTodos.toString();
  statusLengthList.childNodes[3].childNodes[3].textContent =
    wrapperToDos[3].childElementCount;
  statusLengthList.childNodes[5].childNodes[3].textContent =
    wrapperToDos[2].childElementCount;
}

function getColorDifficulty() {
  const valuesDifficulty = document.querySelectorAll(".levelIndicator");
  valuesDifficulty.forEach((valuesDifficulty) => {
    if (valuesDifficulty.textContent == "Fácil") {
      valuesDifficulty.style.backgroundColor = "#6FE6A9";
    } else if (valuesDifficulty.textContent == "Normal") {
      valuesDifficulty.style.backgroundColor = "#FF9533";
    } else {
      valuesDifficulty.style.backgroundColor = "#e74444";
    }
  });
}
