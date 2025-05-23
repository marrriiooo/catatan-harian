import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // Pastikan path sesuai

const Navigation = ({ name, onLogout }) => {
  const { theme, toggleTheme } = useTheme();

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
              backgroundColor: ({ isActive }) =>
                isActive ? `var(--primary-color)` : "transparent",
            }}
          >
            Beranda
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
              backgroundColor: ({ isActive }) =>
                isActive ? `var(--primary-color)` : "transparent",
            }}
          >
            Arsip
          </NavLink>
        </li>

        {/* Tambahkan tombol toggle tema */}
        <li>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </li>

        <li>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>

      <span className="username" style={{ color: `var(--text-color)` }}>
        Halo ini catatan {name}
      </span>
    </nav>
  );
};

// Prop types tetap sama
Navigation.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
