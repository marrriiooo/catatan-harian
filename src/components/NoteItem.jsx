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
      <small>{new Date(createdAt).toLocaleString()}</small>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onDelete(id)}>Hapus</button>
        <button className="archive-btn" onClick={() => onArchive(id)}>
          {archived ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
