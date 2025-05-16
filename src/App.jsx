import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getInitialData } from "./utils";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage"; // Import halaman detail baru

function App() {
  const [notes, setNotes] = useState(getInitialData());

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

  return (
    <div className="app-container">
      <header>
        <h1>Catatan Pribadi</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                notes={notes}
                onAddNote={addNote}
                onDelete={deleteNote}
                onArchive={toggleArchive}
              />
            }
          />
          <Route path="/add" element={<AddPage onAddNote={addNote} />} />
          <Route
            path="/archives"
            element={
              <ArchivePage
                notes={notes}
                onDelete={deleteNote}
                onArchive={toggleArchive}
              />
            }
          />
          <Route
            path="/notes/:id"
            element={
              <DetailPage
                notes={notes}
                onDelete={deleteNote}
                onArchive={toggleArchive}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
