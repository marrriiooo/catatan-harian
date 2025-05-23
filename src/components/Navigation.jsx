import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Navigation = ({ name, onLogout }) => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
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
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </ul>

      <span className="username">Halo ini catatan {name}</span>
    </nav>
  );
};

Navigation.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
