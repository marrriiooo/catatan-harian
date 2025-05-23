import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { getActiveNotes, addNote, archiveNote, deleteNote } from "../utils/api";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newKeyword = searchParams.get("keyword") || "";
    setKeyword(newKeyword);
  }, [location.search]);

  const fetchNotes = async () => {
    try {
      const result = await getActiveNotes();
      setNotes(result || []);
    } catch (err) {
      console.error("Gagal memuat catatan:", err);
      setNotes([]);
    }
  };

  const handleSearch = (keyword) => {
    navigate(`?keyword=${keyword}`);
    setKeyword(keyword);
  };

  const handleAddNote = async (note) => {
    try {
      await addNote(note);
      await fetchNotes();
    } catch (err) {
      console.error("Gagal menambahkan catatan:", err);
    }
  };

  const handleArchive = async (id) => {
    try {
      await archiveNote(id);
      await fetchNotes();
      navigate("/archives");
    } catch (err) {
      console.error("Gagal mengarsipkan catatan:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      await fetchNotes();
    } catch (err) {
      console.error("Gagal menghapus catatan:", err);
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        !note.archived &&
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [notes, keyword]);

  return (
    <>
      <SearchBar keyword={keyword} onSearch={handleSearch} />

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
