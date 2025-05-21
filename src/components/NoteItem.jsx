import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";

function NoteItem({
  id,
  title,
  body,
  createdAt,
  onDelete,
  onArchive,
  archived,
}) {
  return (
    <div className="note-item">
      <Link to={`/notes/${id}`} className="note-item__title">
        <h3>{title}</h3>
      </Link>

      <p className="note-item__body">{body}</p>
      <small className="note-item__date">{showFormattedDate(createdAt)}</small>
      <div className="note-item__actions">
        <button onClick={() => onDelete(id)} className="note-item__delete-btn">
          Hapus
        </button>
        <button
          onClick={() => onArchive(id)}
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
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteItem;
