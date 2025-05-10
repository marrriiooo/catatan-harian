import React, { useState } from "react";
import { getInitialData } from "./utils/data";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [searchKeyword, setSearchKeyword] = useState("");

  const addNote = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  return (
    <div className="app-container">
      <h1>Catatan Pribadi</h1>
      <SearchBar keyword={searchKeyword} onSearch={setSearchKeyword} />
      <NoteForm onAddNote={addNote} />

      <NoteList
        notes={activeNotes}
        onDelete={deleteNote}
        onArchive={toggleArchive}
      />

      <h2>Catatan Arsip</h2>
      <NoteList
        notes={archivedNotes}
        onDelete={deleteNote}
        onArchive={toggleArchive}
      />
    </div>
  );
}

export default App;
