import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

// jadi ini ada bagian dimana nanti componen note item akan di jadikan list atau nanti item akan di listkan atau di rapihkan

function NoteList({ notes, onDelete, onArchive }) {
  if (notes.length === 0) {
    return <p style={{ fontWeight: "bold" }}>Tidak ada catatan</p>;
  }

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
          onDelete={onDelete}
          onArchive={onArchive}
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
