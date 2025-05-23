import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Error boundary component di luar class App
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary">
      <h2>Terjadi Kesalahan!</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} className="retry-button">
        Coba Lagi
      </button>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const { authedUser, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <ThemeProvider>
          <div className="app-container">
            {authedUser === null ? (
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            ) : (
              <>
                <header>
                  <h1>Catatan Pribadi</h1>
                  <Navigation name={authedUser.name} onLogout={this.onLogout} />
                </header>
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/archives" element={<ArchivePage />} />
                    <Route path="/notes/:id" element={<DetailPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </>
            )}
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
