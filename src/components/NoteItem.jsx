import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/api";

function NoteItem({ id, title, body, createdAt, archived, refreshNotes }) {
  const handleDelete = async () => {
    try {
      await deleteNote(id);
      refreshNotes(); // panggil ulang catatan setelah dihapus
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleArchive = async () => {
    try {
      if (archived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }
      refreshNotes(); // panggil ulang catatan setelah diubah
    } catch (error) {
      alert(error.message);
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
        <button onClick={handleDelete} className="note-item__delete-btn">
          Hapus
        </button>
        <button
          onClick={handleToggleArchive}
          className="note-item__archive-btn"
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
