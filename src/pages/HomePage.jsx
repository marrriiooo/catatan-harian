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
