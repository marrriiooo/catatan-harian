import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

const Navigation = ({ name, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();

  const text = {
    home: locale === "id" ? "Beranda" : "Home",
    archive: locale === "id" ? "Arsip" : "Archive",
    logout: locale === "id" ? "Keluar" : "Logout",
    greeting:
      locale === "id" ? "Halo ini catatan" : "Hello, this is the notes of",
    theme:
      locale === "id"
        ? theme === "light"
          ? "🌙 Gelap"
          : "☀️ Terang"
        : theme === "light"
        ? "🌙 Dark"
        : "☀️ Light",
    language: locale === "id" ? "🇬🇧 English" : "🇮🇩 Bahasa",
  };

  return (
    <nav
      className="nav-container"
      style={{
        backgroundColor: `var(--bg-color)`,
        color: `var(--text-color)`,
      }}
    >
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={{
              color: `var(--text-color)`,
            }}
          >
            {text.home}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/archives"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={{
              color: `var(--text-color)`,
            }}
          >
            {text.archive}
          </NavLink>
        </li>

        <li>
          <button onClick={toggleTheme} className="theme-toggle">
            {text.theme}
          </button>
        </li>

        <li>
          <button onClick={toggleLocale} className="locale-toggle">
            {text.language}
          </button>
        </li>

        <li>
          <button onClick={onLogout} className="logout-button">
            {text.logout}
          </button>
        </li>
      </ul>

      <span className="username" style={{ color: `var(--text-color)` }}>
        {text.greeting} {name}
      </span>
    </nav>
  );
};

Navigation.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
