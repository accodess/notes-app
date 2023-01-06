'use strict'

const titleEl = document.querySelector("#note-title");
const bodyEl = document.querySelector("#note-body");
const removeButton = document.querySelector("#remove-note");
const dateElement = document.querySelector("#last-edited");
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign("/notes-app");
}

titleEl.value = note.title;
bodyEl.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleEl.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

bodyEl.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

removeButton.addEventListener("click", () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/notes-app");
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign("/notes-app");
    }

    titleEl.value = note.title;
    bodyEl.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});
