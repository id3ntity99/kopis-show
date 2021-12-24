import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <React.Fragment>
      <nav className="nav-bar">
        <h1>LOGO</h1>
        <ul className="nav-list">
          <li>Home</li>
          <li>Shows</li>
          <li>Stat</li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
