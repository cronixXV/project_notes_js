"use strict";

// Статусы для заметок
const STATUS_TODO = "STATUS_TODO";
const STATUS_PROGRESS = "STATUS_PROGRESS";
const STATUS_DONE = "STATUS_DONE";

class Config {
  getStatus(status) {
    let statuses = {
      STATUS_TODO: "Сделать",
      STATUS_PROGRESS: "В процессе",
      STATUS_DONE: "Завершено",
    };

    return status === undefined ? statuses : statuses[status];
  }
}
