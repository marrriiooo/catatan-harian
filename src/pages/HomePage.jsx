
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getActiveNotes, addNote, archiveNote, deleteNote } from "../utils/api";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const navigate = useNavigate();

  // Ambil catatan dari API saat komponen dimuat
  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  const handleAddNote = async (note) => {
    await addNote(note);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
    navigate("/archives");
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const filteredNotes = notes.filter(
    (note) =>
      !note.archived && note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <SearchBar
        keyword={keyword}
        onSearch={(keyword) => setSearchParams({ keyword })}
      />

      <div className="note-form-container">
        <h2>Tambah Catatan Baru</h2>
        <NoteForm onAddNote={handleAddNote} />
      </div>

      <h2>Catatan Aktif</h2>
      {filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onArchive={handleArchive}
        />
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan aktif</p>
      )}
    </>
  );
}

export default HomePage;

