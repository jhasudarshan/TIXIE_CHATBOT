import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">Brand</a>
      <div className="navbar-container">
        <ul className="navbar-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
