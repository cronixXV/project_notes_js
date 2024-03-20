"use strict";

// Статусы для заметок
const STATUS_TODO = "STATUS_TODO";
const STATUS_PROGRESS = "STATUS_PROGRESS";
const STATUS_DONE = "STATUS_DONE";

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

for (let item of notes) {
  console.log(item);
  console.log("- - - - - - - -");
  console.log(`Название: ${item.title}`);
  console.log(`Описание: ${item.description}`);
  console.log(`Дата: ${item.date}`);
  console.log(`Статус: ${item.status}`);
  console.log("- - - - - - - -");
}

let note1 = {
  title: "Заметка 3",
  description: "-",
  date: new Date(),
  status: STATUS_DONE,
};

notes.push(note1);

console.log(notes);
