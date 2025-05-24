import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote } from "../utils/api"; // Hanya import fungsi yang tersedia

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
      const { data } = await getNote(id); // Perhatikan struktur response
      setNote(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v1/notes/${id}`,
        {
          method: "DELETE",
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

      navigate("/");
    } catch (err) {
      alert("Gagal menghapus catatan: " + err.message);
    }
  };

  const handleToggleArchive = async () => {
    try {
      const endpoint = note.archived ? "unarchive" : "archive";
      const response = await fetch(
        `https://notes-api.dicoding.dev/v1/notes/${id}/${endpoint}`,
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

      if (note.archived) {
        navigate("/");
      } else {
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
        <button onClick={handleDelete} className="delete-btn">
          Hapus
        </button>
        <button
          onClick={handleToggleArchive}
          className={note.archived ? "unarchive-btn" : "archive-btn"}
        >
          {note.archived ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
