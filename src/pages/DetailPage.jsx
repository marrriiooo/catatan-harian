import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const data = await getNote(id);
      setNote(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(id);
      navigate("/");
    } catch (err) {
      alert("Gagal menghapus catatan: " + err.message);
    }
  };

  const handleToggleArchive = async () => {
    try {
      if (note.archived) {
        await unarchiveNote(id);
        navigate("/");
      } else {
        await archiveNote(id);
        navigate("/archives");
      }
    } catch (err) {
      alert("Gagal mengubah status arsip: " + err.message);
    }
  };

  if (error) {
    return <p className="notes-list__empty-message">{error}</p>;
  }

  if (!note) {
    return <p className="notes-list__empty-message">Memuat catatan...</p>;
  }

  return (
    <div className="note-detail">
      <h2 className="note-detail__title">{note.title}</h2>
      <p className="note-detail__body">{note.body}</p>
      <div className="note-detail__actions">
        <button onClick={handleDelete}>Hapus</button>
        <button onClick={handleToggleArchive}>
          {note.archived ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
