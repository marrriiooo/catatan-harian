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
      </ul>

      <div className="nav-right">
        <span className="username">Halo, {name}</span>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
