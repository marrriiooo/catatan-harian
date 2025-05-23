import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import { getActiveNotes, addNote, archiveNote, deleteNote } from "../utils/api";

function withRouter(Component) {
  return function WrappedComponent(props) {
    const location = useLocation();
    const navigate = useNavigate();
    return <Component {...props} location={location} navigate={navigate} />;
  };
}

class HomePage extends Component {
  constructor(props) {
    super(props);

    const searchParams = new URLSearchParams(props.location.search);

    this.state = {
      notes: [],
      keyword: searchParams.get("keyword") || "",
    };
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = async () => {
    try {
      const result = await getActiveNotes();
      this.setState({ notes: result?.data || [] });
    } catch (err) {
      console.error("Gagal memuat catatan:", err);
      this.setState({ notes: [] });
    }
  };

  handleSearch = (keyword) => {
    this.props.navigate({
      search: `keyword=${keyword}`,
    });
    this.setState({ keyword });
  };

  handleAddNote = async (note) => {
    try {
      await addNote(note);
      await this.fetchNotes();
    } catch (err) {
      console.error("Gagal menambahkan catatan:", err);
    }
  };

  handleArchive = async (id) => {
    try {
      await archiveNote(id);
      await this.fetchNotes();
      this.props.history.push("/archives");
    } catch (err) {
      console.error("Gagal mengarsipkan catatan:", err);
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteNote(id);
      await this.fetchNotes();
    } catch (err) {
      console.error("Gagal menghapus catatan:", err);
    }
  };

  get filteredNotes() {
    return this.state.notes.filter(
      (note) =>
        !note.archived &&
        note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );
  }

  render() {
    return (
      <>
        <SearchBar keyword={this.state.keyword} onSearch={this.handleSearch} />

        <div className="note-form-container">
          <h2>Tambah Catatan Baru</h2>
          <NoteForm onAddNote={this.handleAddNote} />
        </div>

        <h2>Catatan Aktif</h2>
        {this.filteredNotes.length > 0 ? (
          <NoteList
            notes={this.filteredNotes}
            onDelete={this.handleDelete}
            onArchive={this.handleArchive}
          />
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan aktif</p>
        )}
      </>
    );
  }
}

export default withRouter(HomePage);
