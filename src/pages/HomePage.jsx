<<<<<<< HEAD
// src/pages/HomePage.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { getActiveNotes, getArchivedNotes, deleteNote } from "../utils/api";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const notes = await getActiveNotes();
    this.setState({ notes });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    const notes = await getActiveNotes();
    this.setState({ notes });
  }

  onKeywordChangeHandler(keyword) {
    this.setState({ keyword });
    this.props.keywordChange(keyword);
  }

  // Di dalam HomePage.jsx
  async onArchiveHandler(id) {
    await archiveNote(id);
    const notes = await getActiveNotes();
    this.setState({ notes });
  }

  async onUnarchiveHandler(id) {
    await unarchiveNote(id);
    const notes = await getArchivedNotes();
    this.setState({ notes });
  }

  render() {
    const filteredNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );

    return (
      <section>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <h2>Daftar Catatan</h2>
        <NoteList notes={filteredNotes} onDelete={this.onDeleteHandler} />
      </section>
    );
  }
}

export default HomePageWrapper;
=======
import React from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function HomePage({ notes, onDelete, onArchive, onAddNote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword") || "";

  // Filter notes berdasarkan keyword dan hanya yang tidak diarsipkan
  const activeNotes = notes.filter(
    (note) =>
      !note.archived && note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <SearchBar
        keyword={keyword}
        onSearch={(keyword) => setSearchParams({ keyword })}
      />

      <div className="note-form-container">
        <h2>Tambah Catatan Baru</h2>
        <NoteForm onAddNote={onAddNote} />
      </div>

      <h2>Catatan Aktif</h2>
      {activeNotes.length > 0 ? (
        <NoteList
          notes={activeNotes}
          onDelete={onDelete}
          onArchive={(id) => {
            onArchive(id);
            navigate("/archives"); // Arahkan ke halaman arsip
          }}
        />
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan aktif</p>
      )}
    </>
  );
}

HomePage.propTypes = {
  notes: PropTypes.array.isRequired,
  onAddNote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default HomePage;
>>>>>>> f9c1ecc500beb9a78a8e315cfd26bfe9cec4fed1
