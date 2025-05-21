<<<<<<< HEAD
// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/DetailPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:id" element={<DetailPage />} />
      </Route>
    </Routes>
=======
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getInitialData } from "./utils";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
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
>>>>>>> f9c1ecc500beb9a78a8e315cfd26bfe9cec4fed1
  );
}

export default App;
