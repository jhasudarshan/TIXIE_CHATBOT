import React from "react";

function Footer() {
  return (
    <footer id="contact" className="footer footer-three">
      <div className="footer-container">
        <p className="text-center">: Quick links :</p>
        <div className="d-flex justify-content-center">
          <a href="#" className="mx-2">
            About
          </a>
          <a href="#" className="mx-2">
            Contact
          </a>
          <a href="#" className="mx-2">
            Login
          </a>
        </div>
        <p className="text-center mt-2">
          &copy; Made with love by Team Botcoders
        </p>
      </div>
    </footer>
  );
}

export default Footer;
