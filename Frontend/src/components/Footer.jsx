import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="contact" className="footer footer-three">
      <div className="footer-container">
        <p className="text-center">: Quick links :</p>
        <div className="d-flex justify-content-center">
          <Link to="/about" className="mx-2">
            About
          </Link>
          <Link to="/contact" className="mx-2">
            Contact Us
          </Link>
          <Link to="/login" className="mx-2">
            Login
          </Link>
        </div>
        <p className="text-center mt-2">
          &copy; Made with love by Team Botcoders
        </p>
      </div>
    </footer>
  );
}

export default Footer;
