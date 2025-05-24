import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { getActiveNotes, addNote } from "../utils/api";

const API_BASE_URL = "https://notes-api.dicoding.dev/v1";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setKeyword(searchParams.get("keyword") || "");
  }, [location.search]);

  const fetchNotes = async () => {
    if (!checkAuth()) return;

    setIsLoading(true);
    try {
      const { data, error } = await getActiveNotes();
      if (error) throw new Error(error.message);
      setNotes(data || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal memuat catatan: " + error.message);
      if (error.message.includes("authentication")) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (keyword) => {
    navigate(`?keyword=${keyword}`);
  };

  const handleAddNote = async (note) => {
    if (!checkAuth()) return;

    setIsSubmitting(true);
    try {
      const { error, data: newNote } = await addNote(note);
      if (error) throw new Error(error.message);

      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setKeyword("");
      navigate(location.pathname, { replace: true });
      alert("Catatan berhasil ditambahkan!");
    } catch (err) {
      console.error("Error:", err);
      alert("Gagal menambahkan catatan: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!checkAuth()) return;

    try {
      const confirmDelete = window.confirm(
        "Apakah Anda yakin ingin menghapus catatan ini?"
      );
      if (!confirmDelete) return;

      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message);
      }

      await fetchNotes();
      alert("Catatan berhasil dihapus!");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus catatan: " + error.message);
    }
  };

  const handleArchiveNote = async (id) => {
    if (!checkAuth()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}/archive`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message);
      }

      await fetchNotes();
      alert("Catatan berhasil diarsipkan!");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengarsipkan catatan: " + error.message);
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
        <NoteForm onAddNote={handleAddNote} isLoading={isSubmitting} />
      </div>

      <h2>Catatan Aktif</h2>
      {isLoading ? (
        <div className="loading-spinner">Memuat data...</div>
      ) : filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDelete={handleDeleteNote}
          onArchive={handleArchiveNote}
        />
      ) : (
        <p className="empty-message" style={{ color: `var(--text-color)` }}>
          {keyword
            ? "Tidak ditemukan hasil pencarian"
            : "Tidak ada catatan aktif"}
        </p>
      )}
    </div>
  );
}

export default HomePage;
