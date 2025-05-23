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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getActiveNotes();
        setNotes(result || []);
      } catch (err) {
        console.error("Gagal memuat catatan:", err);
        alert("Gagal memuat catatan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (keyword) => {
    navigate(`?keyword=${keyword}`);
    setKeyword(keyword);
  };

  const handleAddNote = async (note) => {
    setIsLoading(true);
    try {
      const { data: newNote } = await addNote(note); // Asumsi response API mengembalikan data note baru

      // Optimistic update
      setNotes((prevNotes) => [newNote, ...prevNotes]);

      // Reset pencarian
      setKeyword("");
      navigate(location.pathname, { replace: true });
    } catch (err) {
      console.error("Gagal menambahkan catatan:", err);
      alert("Gagal menambahkan catatan");
    } finally {
      setIsLoading(false);
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
    <div className="home-page-container">
      <SearchBar keyword={keyword} onSearch={handleSearch} />

      <div className="note-form-container">
        <h2>Tambah Catatan Baru</h2>
        <NoteForm onAddNote={handleAddNote} isLoading={isLoading} />
      </div>

      <h2>Catatan Aktif</h2>
      {isLoading ? (
        <p>Memuat data...</p>
      ) : filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDelete={deleteNote}
          onArchive={archiveNote}
        />
      ) : (
        <p style={{ color: `var(--text-color)` }}>
          {keyword
            ? "Tidak ditemukan hasil pencarian"
            : "Tidak ada catatan aktif"}
        </p>
      )}
    </div>
  );
}

export default HomePage;
