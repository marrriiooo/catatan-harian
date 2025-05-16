import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <Link
            to="/"
            className={
              location.pathname === "/" ? "nav-link active" : "nav-link"
            }
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className={
              location.pathname === "/add" ? "nav-link active" : "nav-link"
            }
          >
            Detail Catatan
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
