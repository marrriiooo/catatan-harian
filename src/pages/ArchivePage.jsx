import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api";

function ArchivePage() {
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
      const result = await getArchivedNotes();
      setNotes(result || []);
    } catch (err) {
      console.error("Gagal memuat catatan arsip:", err);
      setNotes([]);
    }
  };

  const handleSearch = (keyword) => {
    navigate(`?keyword=${keyword}`);
    setKeyword(keyword);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      await fetchNotes();
    } catch (err) {
      console.error("Gagal menghapus catatan:", err);
    }
  };

  const handleUnarchive = async (id) => {
    try {
      await unarchiveNote(id);
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
          onDelete={handleDelete}
          onArchive={handleUnarchive}
        />
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan arsip</p>
      )}
    </>
  );
}

export default ArchivePage;
