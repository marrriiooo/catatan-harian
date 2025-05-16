import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// ... ini adaa lah bagian yang menguru untuk menambahkan catatan baru.jadi bagian ini terdiri dari bebebrapa item seperti (form) ,(texxt area) , (button tambah)

// jadi ini variable yang dibuat untuk menampilkan sisa karakter
const MAX_TITLE_LENGTH = 50;

// ini bagian fungsi untuk menambahkan data ke index.js

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

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
    navigate("/");
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

NoteForm.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
export default NoteForm;
