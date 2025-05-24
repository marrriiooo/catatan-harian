import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDeleteNote, onArchiveNote }) {
  // Sesuaikan prop names
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
          onDeleteNote={onDeleteNote}
          onArchiveNote={onArchiveNote}
          onUnarchiveNote={onArchiveNote} // Gabungkan archive/unarchive
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;
