import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">Brand</a>
      <div className="navbar-container">
        <ul className="navbar-links">
          
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><Link to="/Login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
