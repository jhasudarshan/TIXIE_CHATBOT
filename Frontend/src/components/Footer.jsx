import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="contact" className="footer footer-three">
      <div className="footer-container">
        <p className="text-center">Some text in the center</p>
        <div className="d-flex justify-content-center">
          <a href="#about" className="mx-2">About</a>
          <a href="#contact" className="mx-2">Contact</a>
          <Link to='../pages/Login'>Login</Link>
        </div>
        <p className="text-center mt-2">&copy; Made with love by Team Botcoders</p>
      </div>
    </footer>
  );
}

export default Footer;
