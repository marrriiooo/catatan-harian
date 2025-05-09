import React, { useState } from "react";

const MAX_TITLE_LENGTH = 50;

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    const newNote = {
      id: +new Date(),
      title: title.trim(),
      body: body.trim(),
      archived: false,
      createdAt: new Date().toISOString(),
    };

    onAddNote(newNote);
    setTitle("");
    setBody("");
  };

  const handleTitleChange = (e) => {
    const input = e.target.value;
    if (input.length <= MAX_TITLE_LENGTH) {
      setTitle(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <p>Sisa karakter: {MAX_TITLE_LENGTH - title.length}</p>
      <input
        type="text"
        placeholder="Judul catatan"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <textarea
        placeholder="Isi catatan"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <button type="submit">Tambah</button>
    </form>
  );
}

export default NoteForm;
