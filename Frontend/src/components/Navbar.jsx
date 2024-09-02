import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">Tixie</a>
      <div className="navbar-container">
        <div className="navbar-links">
          <a href="#" className="navbar-link">Home</a>
          <a href="#" className="navbar-link">About</a>
          <a href="#" className="navbar-link">Contact Us</a>
          <a href="#" className="navbar-link">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
