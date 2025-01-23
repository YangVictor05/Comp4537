// NotesRetriever logic attributed to ChatGPT
class NotesRetriever {
  constructor(containerId, retrievedTimeId) {
    this.notesContainer = document.getElementById(containerId);
    this.lastRetrievedTime = document.getElementById(retrievedTimeId);
    this.init();
  }

  // Initialize the retriever
  init() {
    readerPage = document.getElementById('reader-page');
    readerPage.textContent = messages.rPage;
    backButton = document.getElementById('back');
    backButton.textContent = messages.back;
    this.loadNotes();
    this.autoRetrieve();

    window.addEventListener('storage', (event) => {
      if (event.key === 'notes') {
        this.loadNotes();
      }
    });
  }

  // Load notes from localStorage
  loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.notesContainer.innerHTML = '';
    notes.forEach((note) => this.createNoteBox(note));
    this.updateRetrievedTime();
  }

  // Create individual note elements
  createNoteBox(content) {
    const noteBox = document.createElement('div');
    noteBox.className = 'note-box';
    noteBox.textContent = content;
    this.notesContainer.appendChild(noteBox);
  }

  // Update the "last retrieved" time
  updateRetrievedTime() {
    const currentTime = new Date().toLocaleString();
    this.lastRetrievedTime.textContent = `${messages.lastRetrievedTime} ${currentTime}`;
  }

  // Automatically retrieve notes every 2 seconds
  autoRetrieve() {
    setInterval(() => this.loadNotes(), 2000);
  }
}

// Instantiate the NotesRetriever
const notesRetriever = new NotesRetriever('notes-container', 'last-retrieved-time');
