import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <React.Fragment>
      <nav className="nav-bar">
        <h1 className="logo">LOGO</h1>
        <ul className="nav-list">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/shows">Shows</a>
          </li>
          <li>
            <a href="/stats">Stat</a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
