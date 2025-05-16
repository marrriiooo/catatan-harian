import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
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
            to="/add"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Tambah Catatan
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
    </nav>
  );
};

export default Navigation;
