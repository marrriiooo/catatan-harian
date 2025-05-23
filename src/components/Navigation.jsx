import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Navigation = ({ name, onLogout }) => {
  return (
    <nav className="nav-container" aria-label="Main navigation">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
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
          >
            Arsip
          </NavLink>
        </li>

        {/* Tambahkan li untuk wrapping button */}
        <li>
          <button
            type="button"
            onClick={onLogout}
            className="logout-button"
            aria-label="Logout"
          >
            Logout
          </button>
        </li>
      </ul>

      <span className="nav-username">Halo, ini catatan {name}</span>
    </nav>
  );
};

Navigation.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
