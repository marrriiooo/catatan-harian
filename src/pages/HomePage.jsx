import React from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { useSearchParams } from "react-router-dom";

function HomePage({ notes, onDelete, onArchive, onAddNote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  // Filter notes berdasarkan keyword dan hanya yang tidak diarsipkan
  const activeNotes = notes.filter(
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
        <NoteForm onAddNote={onAddNote} />
      </div>

      <h2>Catatan Aktif</h2>
      {activeNotes.length > 0 ? (
        <NoteList
          notes={activeNotes}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan aktif</p>
      )}
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
