import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils";

function DetailPage({ notes, onDelete, onArchive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return (
      <div className="detail-not-found">
        <h2>Catatan tidak ditemukan</h2>
        <button onClick={() => navigate("/")}>Kembali ke Beranda</button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Kembali
      </button>
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__date">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>
      <div className="detail-page__actions">
        <button
          onClick={() => onArchive(note.id)}
          className="action-button archive"
        >
          {note.archived ? "Aktifkan" : "Arsipkan"}
        </button>
        <button
          onClick={() => {
            onDelete(note.id);
            navigate("/");
          }}
          className="action-button delete"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

DetailPage.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default DetailPage;
