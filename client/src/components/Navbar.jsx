import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="navbar">

      <Link to="/" className="nav-logo">
        AURA
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About AURA
        </Link>

        <Link to="/help">
          Get Help
        </Link>

        <Link to="/mission">
          Mission
        </Link>

      </div>

      <Link to="/help" className="nav-help-button">
        Talk to AURA
      </Link>

    </nav>
  );
}

export default Navbar;