import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Tixie</div>
      <div className="navbar-container">
        <div className="navbar-links">
          <a href="#" className="navbar-link">Home</a>
          <a href="#about" className="navbar-link">About</a>
          <a href="#" className="navbar-link">Contact Us</a>
          <Link to="/login" className="navbar-link">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
