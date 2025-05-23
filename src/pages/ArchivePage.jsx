import React from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";

function ArchivePage({ notes, onDelete, onArchive }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword") || "";

  const filteredNotes = notes.filter(
    (note) =>
      note.archived && note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <SearchBar
        keyword={keyword}
        onSearch={(keyword) => setSearchParams({ keyword })}
      />

      <h2>Catatan Arsip</h2>
      <NoteList
        notes={filteredNotes}
        onDelete={onDelete}
        onArchive={(id) => {
          onArchive(id);
          navigate("/");
        }}
      />
    </>
  );
}

ArchivePage.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchivePage;
