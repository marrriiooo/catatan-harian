import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { getActiveNotes, addNote, archiveNote, deleteNote } from "../utils/api";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const navigate = useNavigate();

  // Ambil catatan saat pertama kali load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await getActiveNotes();
        setNotes(result?.data || []);
      } catch (err) {
        console.error("Gagal memuat catatan:", err);
        setNotes([]);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async (note) => {
    try {
      await addNote(note);
      const result = await getActiveNotes();
      setNotes(result?.data || []);
    } catch (err) {
      console.error("Gagal menambahkan catatan:", err);
    }
  };

  const handleArchive = async (id) => {
    try {
      await archiveNote(id);
      const result = await getActiveNotes();
      setNotes(result?.data || []);
      navigate("/archives");
    } catch (err) {
      console.error("Gagal mengarsipkan catatan:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      const result = await getActiveNotes();
      setNotes(result?.data || []);
    } catch (err) {
      console.error("Gagal menghapus catatan:", err);
    }
  };

  const filteredNotes = (notes || []).filter(
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
