"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // DOM
  let formElement = document.getElementById("form");
  let formBtn = document.getElementById("form-btn");
  let formStatus = form.querySelector("#form-status");
  let notesContainer = document.getElementById("notes");

  let app = new App(formElement, formBtn, notesContainer, formStatus, true, true);
});
