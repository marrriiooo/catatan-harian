import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getInitialData } from "./utils";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      authedUser: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await getUserLogged();
        this.setState({
          authedUser: response.data,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("accessToken");
      this.setState({
        authedUser: null,
        loading: false,
      });
    }
  }

  onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState({ authedUser: data });
  };

  onLogout = () => {
    localStorage.removeItem("accessToken");
    this.setState({ authedUser: null });
  };

  addNote = (newNote) => {
    this.setState((prevState) => ({
      notes: [newNote, ...prevState.notes],
    }));
  };

  deleteNote = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  };

  toggleArchive = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  };

  render() {
    const { notes, authedUser, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (authedUser === null) {
      return (
        <div className="app-container">
          <Routes>
            <Route
              path="/*"
              element={<LoginPage loginSuccess={this.onLoginSuccess} />}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      );
    }

    return (
      <div className="app-container">
        <header>
          <h1>Catatan Pribadi</h1>
          <Navigation name={authedUser.name} onLogout={this.onLogout} />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  notes={notes}
                  onAddNote={this.addNote}
                  onDelete={this.deleteNote}
                  onArchive={this.toggleArchive}
                />
              }
            />
            <Route
              path="/archives"
              element={
                <ArchivePage
                  notes={notes}
                  onDelete={this.deleteNote}
                  onArchive={this.toggleArchive}
                />
              }
            />
            <Route
              path="/notes/:id"
              element={
                <DetailPage
                  notes={notes}
                  onDelete={this.deleteNote}
                  onArchive={this.toggleArchive}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
