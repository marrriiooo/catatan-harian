import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { showFormattedDate } from "./../utils/index";

function NoteItem({
  id,
  title,
  body,
  createdAt,
  archived,
  onDeleteNote,
  onArchiveNote,
  onUnarchiveNote,
}) {
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const confirmDelete = window.confirm(
        "Yakin ingin menghapus catatan ini?"
      );
      if (!confirmDelete) return;

      await onDeleteNote(id);
    } catch (error) {
      alert("Gagal menghapus catatan: " + error.message);
    }
  };

  const handleToggleArchive = async (e) => {
    e.stopPropagation();
    try {
      const action = archived ? "memindahkan ke aktif" : "mengarsipkan";
      const confirmAction = window.confirm(
        `Yakin ingin ${action} catatan ini?`
      );
      if (!confirmAction) return;

      if (archived) {
        await onUnarchiveNote(id);
      } else {
        await onArchiveNote(id);
      }
    } catch (error) {
      alert(
        `Gagal ${archived ? "memindahkan" : "mengarsipkan"} catatan: ${
          error.message
        }`
      );
    }
  };

  return (
    <div className="note-item">
      <Link to={`/notes/${id}`} className="note-item__title">
        <h3>{title}</h3>
      </Link>
      <p className="note-item__body">{body}</p>
      <small className="note-item__date">{showFormattedDate(createdAt)}</small>
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
  onDeleteNote: PropTypes.func.isRequired,
  onArchiveNote: PropTypes.func.isRequired,
  onUnarchiveNote: PropTypes.func.isRequired,
};

export default NoteItem;
