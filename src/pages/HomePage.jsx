import React from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { useSearchParams } from "react-router-dom";

function HomePage({ notes, onDelete, onArchive, onAddNote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );
  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  return (
    <>
      <SearchBar
        keyword={keyword}
        onSearch={(keyword) => setSearchParams({ keyword })}
      />

      <div className="note-form-container">
        <h2>Tambah Catatan Baru</h2>
        <NoteForm onAddNote={onAddNote} />
      </div>

      <h2>Catatan Aktif</h2>
      <NoteList notes={activeNotes} onDelete={onDelete} onArchive={onArchive} />

      <h2>Catatan Arsip</h2>
      <NoteList
        notes={archivedNotes}
        onDelete={onDelete}
        onArchive={onArchive}
      />
    </>
  );
}

HomePage.propTypes = {
  notes: PropTypes.array.isRequired,
  onAddNote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default HomePage;
