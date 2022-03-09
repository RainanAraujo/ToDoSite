import {
  setToDo,
  getToDos,
  deleteToDo,
  alterListToDo,
} from "../../services/firestore.js";
const wrapperToDos = document.querySelectorAll(".wrapperToDos");
const modal = document.querySelector(".modal");
const openModalButton = document.getElementById("openModalNewToDo");
const addToDoButton = document.getElementById("addToDo");
const buttonCloseModal = document.getElementById("buttonCloseModal");
var toDo = document.querySelectorAll(".toDo");
var toDos = [{}];

(async () => {
  toDos = await getToDos();
  generateToDos();
})();

async function generateToDos() {
  wrapperToDos.forEach((item) => (item.innerHTML = ""));
  toDos.map((toDo) => {
    wrapperToDos.forEach((wrapperToDo) => {
      if (wrapperToDo.getAttribute("id") == toDo.data.typeList) {
        wrapperToDo.appendChild(
          renderItem(
            toDo.id,
            toDo.data.title,
            toDo.data.levelIndicator,
            toDo.data.participants,
            toDo.data.createDate
          )
        );
      }
    });
  });

  addEventListenerToDos();
  getCountToDoLists();
  getColorDifficulty();
  addEventListenerButtonsRemove();
}

const renderItem = (id, title, levelIndicator, participants, createDate) => {
  const toDoItem = document.createElement("div");
  toDoItem.className = "toDo";
  toDoItem.setAttribute("draggable", "true");
  toDoItem.setAttribute("id", id);
  toDoItem.innerHTML = `   
  <div class="headerToDo">
    <span> ${title}</span>
    <div class="levelIndicator">${levelIndicator}</div>
  </div>
  <div class="infoToDo">Participante: <span>${participants}</span></div>
  <div class="infoToDo">
    Data de criação: <span>${createDate}</span>
  </div>
  <img id="buttonTrash" src="../../assets/trash.svg" alt=""/>
  `;
  return toDoItem;
};

buttonCloseModal.addEventListener("click", () => {
  modal.style.display = "none";
});

openModalButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

addToDoButton.addEventListener("click", () => {
  addNewTodo();
});

function addEventListenerButtonsRemove() {
  const buttonRemoveToDo = document.querySelectorAll("#buttonTrash");
  buttonRemoveToDo.forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteToDo(e.target.parentNode.getAttribute("id"));
      toDos = toDos.filter((toDoItem) => {
        return toDoItem.id != e.target.parentNode.getAttribute("id");
      });
      generateToDos();
    });
  });
}

async function addNewTodo() {
  const titleInput = document.getElementById("titleInput");
  const participantsInput = document.getElementById("participantsInput");

  function getDifficulty() {
    if (document.getElementById("radioEasy").checked) {
      return "Fácil";
    } else if (document.getElementById("radioNormal").checked) {
      return "Normal";
    } else {
      return "Difícil";
    }
  }

  if (participantsInput.value != "" && titleInput.value != "") {
    const date = new Date();
    const currentDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    addToDoButton.setAttribute("disabled", true);
    await setToDo(
      titleInput.value,
      getDifficulty(),
      participantsInput.value,
      currentDate
    )
      .then(async () => {
        toDos = await getToDos();
        generateToDos();
        modal.style.display = "none";
        participantsInput.value = "";
        titleInput.value = "";
        addToDoButton.removeAttribute("disabled");
      })
      .catch((e) => {
        console.log(e);
        addToDoButton.removeAttribute("disabled");
      });
  } else {
    alert("Preencha todos os campos.");
  }
}

//Drag And Drop

function addEventListenerToDos() {
  toDo = document.querySelectorAll(".toDo");
  toDo.forEach((card) => {
    card.addEventListener("dragstart", toDoDragStart);
    card.addEventListener("dragend", toDoDragEnd);
  });
}

wrapperToDos.forEach((wrapperToDos) => {
  wrapperToDos.addEventListener("dragover", wrapperDragOver);
  wrapperToDos.addEventListener("dragleave", wrapperDragLeave);
  wrapperToDos.addEventListener("drop", wrapperDragDrop);
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

async function wrapperDragDrop() {
  this.classList.remove("wrapperToDosDrawable");
  let indexToDoDragged;
  toDos.some((el, i) => {
    if (el.id == document.querySelector(".dragging").getAttribute("id")) {
      indexToDoDragged = i;
    }
  });
  toDos[indexToDoDragged].data.typeList = this.getAttribute("id");
  await alterListToDo(
    document.querySelector(".dragging").getAttribute("id"),
    this.getAttribute("id")
  );
}

function getCountToDoLists() {
  const statusLengthList = document.getElementById("status");
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
