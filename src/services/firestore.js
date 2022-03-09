import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
const db = getFirestore();

export async function setToDo(title, levelIndicator, participants, createDate) {
  try {
    await addDoc(collection(db, "toDos"), {
      title: title,
      levelIndicator: levelIndicator,
      participants: participants,
      createDate: createDate,
      typeList: "Tarefas",
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getToDos() {
  const toDos = await getDocs(collection(db, "toDos"));
  return toDos.docs
    .map((toDo) => {
      return { data: toDo.data(), id: toDo.id };
    })
    .reverse();
}

export async function deleteToDo(toDoID) {
  await deleteDoc(doc(db, "toDos", toDoID));
}

export async function alterListToDo(toDoID, typeList) {
  const typeListRef = doc(db, "toDos", toDoID);
  await updateDoc(typeListRef, {
    typeList: typeList,
  });
}
