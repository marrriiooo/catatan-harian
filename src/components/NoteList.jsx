import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({
  notes,
  onDeleteNote,
  onArchiveNote,
  onUnarchiveNote,
  archiveText,
}) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
          archived={note.archived}
          onDeleteNote={onDeleteNote}
          onArchiveNote={onArchiveNote}
          onUnarchiveNote={onUnarchiveNote}
          archiveText={archiveText}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onArchiveNote: PropTypes.func.isRequired,
  onUnarchiveNote: PropTypes.func.isRequired,
  archiveText: PropTypes.string,
};

NoteList.defaultProps = {
  archiveText: "Arsipkan",
};

export default NoteList;
