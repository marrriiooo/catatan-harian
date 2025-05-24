import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { addNote } from "../utils/api";
import { useLocale } from "../contexts/LocaleContext"; // ⬅️ Tambah ini

const API_BASE_URL = "https://notes-api.dicoding.dev/v1";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLocale(); // ⬅️ Ambil fungsi translate
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showArchiveSuccess, setShowArchiveSuccess] = useState(false);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = await response.json();

      if (result.status !== "success") {
        throw new Error(result.message || t("fetch_error"));
      }

      setNotes(result.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearch = useCallback(
    (keyword) => {
      setKeyword(keyword);
      navigate(`?keyword=${keyword}`);
    },
    [navigate]
  );

  const handleAddNote = useCallback(
    async (note) => {
      setIsLoading(true);
      try {
        const { error, data: newNote } = await addNote(note);
        if (error) throw new Error(error.message);

        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setKeyword("");
        navigate(location.pathname, { replace: true });
      } catch (err) {
        console.error("Error:", err);
        alert(`${t("add_note_failed")}: ` + err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, location.pathname, t]
  );

  const handleDeleteNote = useCallback(
    async (id) => {
      try {
        const confirmDelete = window.confirm(t("confirm_delete"));
        if (!confirmDelete) return;

        const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (result.status !== "success") {
          throw new Error(result.message || t("delete_failed"));
        }

        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert(error.message);
        fetchNotes();
      }
    },
    [fetchNotes, t]
  );

  const handleArchiveNote = useCallback(
    async (id) => {
      try {
        const confirmArchive = window.confirm(t("confirm_archive"));
        if (!confirmArchive) return;

        const response = await fetch(`${API_BASE_URL}/notes/${id}/archive`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const result = await response.json();

        if (result.status !== "success") throw new Error(result.message);

        setNotes((prev) => prev.filter((note) => note.id !== id));
        setShowArchiveSuccess(true);

        const timer = setTimeout(() => {
          setShowArchiveSuccess(false);
          navigate("/archives");
        }, 2000);

        return () => clearTimeout(timer);
      } catch (error) {
        alert(t("archive_failed") + ": " + error.message);
      }
    },
    [navigate, t]
  );

  const filteredNotes = React.useMemo(() => {
    return notes.filter(({ title, archived }) => {
      return !archived && title.toLowerCase().includes(keyword.toLowerCase());
    });
  }, [notes, keyword]);

  return (
    <div className="home-page-container">
      {showArchiveSuccess && (
        <div className="success-message">{t("archive_success")}</div>
      )}

      <SearchBar keyword={keyword} onSearch={handleSearch} />

      <div className="note-form-container">
        <h2>{t("add_new_note")}</h2>
        <NoteForm onAddNote={handleAddNote} isLoading={isLoading} />
      </div>

      <h2>{t("active_notes")}</h2>
      {isLoading ? (
        <p>{t("loading")}</p>
      ) : filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDeleteNote={handleDeleteNote}
          onArchiveNote={handleArchiveNote}
        />
      ) : (
        <p style={{ color: `var(--text-color)` }}>
          {keyword ? t("search_not_found") : t("no_active_notes")}
        </p>
      )}
    </div>
  );
}

export default HomePage;
