import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getArchivedNotes } from "../utils/api";

const API_BASE_URL = "https://notes-api.dicoding.dev/v1";

function ArchivePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setKeyword(searchParams.get("keyword") || "");
  }, [location.search]);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getArchivedNotes();
      setNotes(data || []);
    } catch (err) {
      console.error("Gagal memuat catatan arsip:", err);
      setError("Gagal memuat catatan arsip");
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (keyword) => {
    navigate(`?keyword=${keyword}`);
    setKeyword(keyword);
  };

  const handleDeleteNote = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Yakin ingin menghapus catatan ini?"
      );
      if (!confirmDelete) return;

      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.status !== "success") {
        throw new Error(result.message || "Gagal menghapus catatan");
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      setError("Gagal menghapus catatan: " + error.message);
      await fetchNotes();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnarchiveNote = async (id) => {
    try {
      const confirmUnarchive = window.confirm(
        "Pindahkan catatan ini ke aktif?"
      );
      if (!confirmUnarchive) return;

      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/notes/${id}/unarchive`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.status !== "success") {
        throw new Error(result.message || "Gagal memindahkan catatan");
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      navigate("/");
    } catch (error) {
      console.error("Unarchive error:", error);
      setError("Gagal memindahkan catatan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.archived &&
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [notes, keyword]);

  return (
    <div className="archive-page">
      <SearchBar keyword={keyword} onSearch={handleSearch} />

      <h2>Arsip Catatan</h2>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <p>Memuat...</p>
      ) : filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDeleteNote={handleDeleteNote}
          onUnarchiveNote={handleUnarchiveNote} // Changed from onArchive to onUnarchiveNote
          archiveText="Pindahkan"
        />
      ) : (
        <p className="notes-list__empty-message">
          {keyword
            ? "Tidak ditemukan hasil pencarian"
            : "Tidak ada catatan arsip"}
        </p>
      )}
    </div>
  );
}

export default ArchivePage;
