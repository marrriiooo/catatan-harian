// src/components/NoteList.jsx

import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  if (notes.length === 0) {
    return <p>Tidak ada catatan</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
        />
      ))}
    </div>
  );
}

export default NoteList;
