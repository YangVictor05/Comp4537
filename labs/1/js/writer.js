//NotesApp logic attributed to ChatGPT
class NotesApp {
  constructor(containerId, addButtonId, lastSavedId) {
    this.notesContainer = document.getElementById(containerId);
    this.addNoteButton = document.getElementById(addButtonId);
    this.lastSavedTime = document.getElementById(lastSavedId);
    this.addNoteButton.textContent = messages.add;
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.init();
  }

  // Initialize the app
  init() {
    writerPage = document.getElementById('writer-page');
    writerPage.textContent = messages.wPage;
    backButton = document.getElementById('back');
    backButton.textContent = messages.back;
    this.loadNotes();
    this.addNoteButton.onclick = () => this.addNote();
    this.autoSave();
  }

  // Load notes into the container
  loadNotes() {
    this.notesContainer.innerHTML = '';
    this.notes.forEach((note, index) => this.createNoteElement(note, index));
  }

  // Create a note element
  createNoteElement(content, index) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note-box';

    const textarea = document.createElement('textarea');
    textarea.value = content;
    textarea.oninput = () => this.updateNote(index, textarea.value);

    const removeButton = document.createElement('button');
    removeButton.textContent = messages.remove;
    removeButton.onclick = () => this.removeNote(index);

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(removeButton);
    this.notesContainer.appendChild(noteDiv);
  }

  // Update a note's content
  updateNote(index, content) {
    this.notes[index] = content;
    this.saveNotes();
  }

  // Add a new note
  addNote() {
    this.notes.push('');
    this.saveNotes();
    this.loadNotes();
  }

  // Remove a note
  removeNote(index) {
    this.notes.splice(index, 1);
    this.saveNotes();
    this.loadNotes();
  }

  // Save notes to localStorage
  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    const currentTime = new Date().toLocaleString();
    this.lastSavedTime.textContent = `${messages.lastSavedTime} ${currentTime}`;
  }

  // Automatically save notes every 2 seconds
  autoSave() {
    setInterval(() => this.saveNotes(), 2000);
  }
}

// Instantiate the NotesApp
const notesApp = new NotesApp('notes-container', 'add-note', 'last-saved-time');
