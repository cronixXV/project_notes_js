"use strict";

// Статусы для заметок
const STATUS_TODO = "STATUS_TODO";
const STATUS_PROGRESS = "STATUS_PROGRESS";
const STATUS_DONE = "STATUS_DONE";

function getStatus(status) {
  let statuses = {
    STATUS_TODO: "Сделать",
    STATUS_PROGRESS: "В процессе",
    STATUS_DONE: "Завершено",
  };

  return status === undefined ? statuses : statuses[status];
}

function setStatusOptions(selectElement) {
  if (!selectElement) {
    return;
  }

  let statuses = getStatus();

  let defaultOptionElement = document.createElement("option");
  defaultOptionElement.value = "";
  defaultOptionElement.selected = "selected";
  defaultOptionElement.hidden = "hidden";
  defaultOptionElement.textContent = "Выберите статус";
  selectElement.append(defaultOptionElement);

  for (let item in statuses) {
    let optionElement = document.createElement("option");
    optionElement.value = item;
    optionElement.textContent = statuses[item];
    selectElement.append(optionElement);
  }
}

function init() {
  setStatusOptions(document.getElementById("form-status"));
}

const notes = [
  {
    title: "Заметка 1",
    description: "-",
    date: new Date(),
    status: STATUS_PROGRESS,
  },

  {
    title: "Заметка 2",
    description: "-",
    date: new Date(),
    status: STATUS_TODO,
  },
];

function createNote(note) {
  //Строим контейнер для заметки
  let noteElement = document.createElement("div");
  noteElement.classList.add("note");

  //h3
  let titleElement = document.createElement("h3");
  titleElement.textContent = note.title;

  //Описание
  let descriptionElement = document.createElement("div");
  descriptionElement.classList.add("note-descr");
  descriptionElement.textContent = note.description;

  //Дата
  let dataElement = document.createElement("div");
  dataElement.classList.add("note-date");
  dataElement.textContent = note.date;

  // Статус
  let statusElement = document.createElement("div");
  statusElement.classList.add("note-status");
  statusElement.textContent = getStatus(note.status);

  //Сслыки
  let linksElement = document.createElement("div");
  linksElement.classList.add("note-links");

  //a
  let deleteLinkElement = document.createElement("a");
  deleteLinkElement.href = "#delete";
  deleteLinkElement.textContent = "Удалить";
  linksElement.append(deleteLinkElement);

  //Собираем заметки
  noteElement.append(titleElement);
  noteElement.append(descriptionElement);
  noteElement.append(dataElement);
  noteElement.append(statusElement);
  noteElement.append(linksElement);

  return noteElement;
}

document.addEventListener("DOMContentLoaded", () => {
  // Init
  init();

  // DOM
  let form = document.getElementById("form");
  let formBtn = document.getElementById("form-btn");
  let notesContainer = document.getElementById("notes");

  //Отправка формы
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = form.querySelector("#form-title").value;
    let description = form.querySelector("#form-descr").value;
    let date = form.querySelector("#form-date").value;
    let selectStatus = form.querySelector("#form-status");
    let status = selectStatus.options[selectStatus.selectedIndex].value;

    // console.log(title, description, date, selectStatus, status);
    if (!title) {
      alert("Введите название заметки");
      return;
    }

    if (title < 3) {
      alert("Введите больше данных");
      return;
    }

    if (!date) {
      alert("Выберите дату");
      return;
    }

    if (!status) {
      alert("Выберите статус");
      return;
    }

    let noteData = {
      title,
      description,
      date,
      status,
    };

    let newNote = createNote(noteData);
    notesContainer.prepend(newNote);

    //Очистка формы
    form.reset();
  });

  //Событие отправки формы при нажатии на кнопку

  formBtn.addEventListener("click", (event) => {
    let eventSubmit = new Event("submit", { cancelable: true });
    form.dispatchEvent(eventSubmit);
  });

  //Удаление заметки
  notesContainer.addEventListener("click", (event) => {
    event.preventDefault();
    let item = event.target;

    if (item.tagName !== "A") {
      return;
    }

    item.closest(".note").remove();
  });
});
