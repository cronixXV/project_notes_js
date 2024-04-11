"use strict";

class Note {
  constructor(title, description, date, status) {
    //приходят параметры каждой заметки
    this.title = title;
    this.description = description;
    if (date instanceof Date) {
      this.date = date.toLocaleDateString("ru-Ru");
    } else {
      this.date = date;
    }
    this.status = status;
  }

  createDOMNote(config) {
    //Строим контейнер для заметки
    let noteElement = document.createElement("div");
    noteElement.classList.add("note");

    //h3
    let titleElement = document.createElement("h3");
    titleElement.textContent = this.title;

    //Описание
    let descriptionElement = document.createElement("div");
    descriptionElement.classList.add("note-descr");
    descriptionElement.textContent = this.description;

    //Дата
    let dataElement = document.createElement("div");
    dataElement.classList.add("note-date");
    dataElement.textContent = this.date;

    // Статус
    let statusElement = document.createElement("div");
    statusElement.classList.add("note-status");
    statusElement.textContent = config.getStatus(this.status);

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
    if (this.description) {
      noteElement.append(descriptionElement);
    }
    noteElement.append(dataElement);
    noteElement.append(statusElement);
    noteElement.append(linksElement);

    return noteElement;
  }
}
