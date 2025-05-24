import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { addNote } from "../utils/api";

const API_BASE_URL = "https://notes-api.dicoding.dev/v1";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = await response.json();
      console.log("Fetch notes result:", result);

      if (result.status !== "success") {
        throw new Error(result.message || "Failed to fetch notes");
      }

      setNotes(result.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ... rest of your code ...

  const handleSearch = (keyword) => {
    navigate(`?keyword=${keyword}`);
  };

  const handleAddNote = async (note) => {
    setIsLoading(true);
    try {
      const { error, data: newNote } = await addNote(note);
      if (error) throw new Error(error.message);

      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setKeyword("");
      navigate(location.pathname, { replace: true });
    } catch (err) {
      console.error("Error:", err);
      alert("Gagal menambahkan catatan: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Di bagian handler functions:

  const handleDeleteNote = async (id) => {
    try {
      // Tambahkan konfirmasi
      const confirmDelete = window.confirm(
        "Yakin ingin menghapus catatan ini?"
      );
      if (!confirmDelete) return;

      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Delete response:", result); // Debugging

      if (result.status !== "success") {
        throw new Error(result.message || "Gagal menghapus catatan");
      }

      // Perbarui state secara langsung (optimistic update)
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
      // Refresh data jika error
      await fetchNotes();
    }
  };

  const handleArchiveNote = async (id) => {
    try {
      const endpoint = notes.find((n) => n.id === id)?.archived
        ? "unarchive"
        : "archive";

      const response = await fetch(`${API_BASE_URL}/notes/${id}/${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const result = await response.json();

      if (result.status !== "success") throw new Error(result.message);

      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      alert("Gagal: " + error.message);
    }
  };

  const filteredNotes = notes.filter(({ title, archived }) => {
    return !archived && title.toLowerCase().includes(keyword.toLowerCase());
  });

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
          onDeleteNote={handleDeleteNote} // Pastikan nama prop ini
          onArchiveNote={handleArchiveNote}
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
