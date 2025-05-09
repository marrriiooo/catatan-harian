// src/components/NoteItem.jsx

function NoteItem({ title, body, createdAt }) {
  return (
    <div className="note-item">
      <h3>{title}</h3>
      <p>{body}</p>
      <small>{new Date(createdAt).toLocaleString()}</small>
    </div>
  );
}

export default NoteItem;
