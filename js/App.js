"use strict";

class App {
  /**
   * @property {string} file - Файл для получения начальных заметок
   */

  file = "./notes.json";

  notes = [
    {
      title: "Заметка 1",
      description: "Тестовая заметка 1",
      date: new Date(),
      status: STATUS_PROGRESS,
    },

    {
      title: "Заметка 2",
      date: new Date(),
      status: STATUS_TODO,
    },
  ];

  /**
   *
   * @param {HTMLFormElement} formElement - Форма для добавления заметки
   * @param {HTMLDivElement} formBtn - Кнопка формы для создания новой заметки
   * @param {HTMLDivElement} notesContainer - Контейнер для заметок
   * @param {HTMLSelectElement} formStatus - Выпадающий список с доступными статусами заметок
   * @param {boolean} autoRun - Если параметр true, автоматически выполянется инициализация событий компонента
   * @param {boolean} loadNotes - Если параметр true, автоматически загружаются заметки из файла
   */

  constructor(formElement, formBtn, notesContainer, formStatus, autoRun = true, loadNotes = false) {
    this.formElement = formElement;
    this.formBtn = formBtn;
    this.notesContainer = notesContainer;
    this.formStatus = formStatus;

    this.config = new Config();

    //Загружаем заметки из файла
    if (loadNotes) {
      let data = this.loadNotes().then((notesFromFile) => {
        if (notesFromFile.length) {
          this.notes = this.notes.concat(notesFromFile);
        }

        //Запуск init()
        if (autoRun) {
          this.init();
        }
      });
    }

    //Запуск init()
    if (autoRun && !loadNotes) {
      this.init();
    }
  }

  init() {
    // Отрисовка статусов
    this.setStatusOptions(this.formStatus);

    //Отрисовка существующих заметок
    this.drawNotes();

    //Отправка формы
    this.formElement.addEventListener("submit", this.onSubmitForm.bind(this));

    //Событие отправки формы при нажатии на кнопку
    this.formBtn.addEventListener("click", this.onClickBtn.bind(this));

    //Удаление заметки
    this.notesContainer.addEventListener("click", this.onDeleteNote);
  }

  async loadNotes() {
    let data = await fetch(this.file);
    let notes = await data.json();
    return notes;
  }

  drawNotes() {
    if (!this.notes.length) {
      return;
    }

    // console.log(JSON.stringify(this.notes, true, 4));

    for (let item of this.notes) {
      if (typeof item.date === "string") {
        item.date = new Date(item.date);
      }
      let note = new Note(item.title, item.description, item.date, item.status);
      let newNote = note.createDOMNote(this.config);
      this.notesContainer.prepend(newNote);
    }
  }

  setStatusOptions(selectElement) {
    if (!selectElement) {
      return;
    }

    let statuses = this.config.getStatus();

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

  onSubmitForm(event) {
    event.preventDefault();

    let title = this.formElement.querySelector("#form-title").value;
    let description = this.formElement.querySelector("#form-descr").value;
    let date = this.formElement.querySelector("#form-date").value;
    let selectStatus = this.formElement.querySelector("#form-status");
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

    let note = new Note(title, description, new Date(date), status);

    let newNote = note.createDOMNote(this.config);
    this.notesContainer.prepend(newNote);

    //Очистка формы
    this.formElement.reset();
  }

  //Событие отправки формы при нажатии на кнопку
  onClickBtn() {
    let eventSubmit = new Event("submit", { cancelable: true });
    this.formElement.dispatchEvent(eventSubmit);
  }

  //Удаление заметки
  onDeleteNote(event) {
    event.preventDefault();
    let item = event.target;

    if (item.tagName !== "A") {
      return;
    }

    item.closest(".note").remove();
  }
}
