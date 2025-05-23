import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/api";

function NoteItem({ id, title, body, createdAt, archived, refreshNotes }) {
  const handleDelete = async () => {
    try {
      await deleteNote(id);
      refreshNotes();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleArchive = async () => {
    try {
      archived ? await unarchiveNote(id) : await archiveNote(id);
      refreshNotes();
    } catch (error) {
      alert(error.message);
    }
  };

  // Format tanggal langsung di komponen
  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="note-item">
      <Link to={`/notes/${id}`} className="note-item__title">
        <h3>{title}</h3>
      </Link>
      <p className="note-item__body">{body}</p>
      <small className="note-item__date">{formattedDate}</small>
      <div className="note-item__actions">
        <button
          onClick={handleDelete}
          className="note-item__delete-btn"
          aria-label="Hapus catatan"
        >
          Hapus
        </button>
        <button
          onClick={handleToggleArchive}
          className="note-item__archive-btn"
          aria-label={archived ? "Pindahkan dari arsip" : "Arsipkan catatan"}
        >
          {archived ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  refreshNotes: PropTypes.func.isRequired,
};

export default NoteItem;
