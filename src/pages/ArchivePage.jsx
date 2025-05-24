import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getArchivedNotes } from "../utils/api"; // Hanya import yang tersedia
const API_BASE_URL = "https://notes-api.dicoding.dev/v1";

function ArchivePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("keyword") || "";
  });

  React.useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newKeyword = searchParams.get("keyword") || "";
    setKeyword(newKeyword);
  }, [location.search]);

  const fetchNotes = async () => {
    try {
      const { data } = await getArchivedNotes();
      setNotes(data || []);
    } catch (err) {
      console.error("Gagal memuat catatan arsip:", err);
      setNotes([]);
    }
  };

  const handleSearch = (keyword) => {
    navigate(`?keyword=${keyword}`);
    setKeyword(keyword);
  };

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

  const handleUnarchive = async (id) => {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v1/notes/${id}/unarchive`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message);
      }

      await fetchNotes();
      navigate("/");
    } catch (err) {
      console.error("Gagal memindahkan catatan:", err);
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
    <>
      <SearchBar keyword={keyword} onSearch={handleSearch} />

      <h2>Arsip Catatan</h2>
      {filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDeleteNote={handleDeleteNote}
          onArchive={handleUnarchive}
          archiveText="Pindahkan"
        />
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan arsip</p>
      )}
    </>
  );
}

export default ArchivePage;
