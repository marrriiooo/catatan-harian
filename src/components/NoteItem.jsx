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
      <h3>{title}</h3>
      <p>{body}</p>
      <small style={{ color: "purple", fontWeight: "bold" }}>
        {showFormattedDate(createdAt)}
      </small>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onDelete(id)}>Hapus</button>
        <button className="archive-btn" onClick={() => onArchive(id)}>
          {archived ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteItem;
