import React from "react";
import { Link } from "react-router-dom";
import '../styles/footer.css'

function Footer() {
  return (
    <footer className="footer-container">
    <div className="footer-content">
      <div className="footer-contact">
        <p>Email: <a href="mailto:support@tixie.com">support@tixie.com</a></p>
        <p>Customer Support: <a href="tel:+1234567890">+044-25262999</a></p>
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <Link to="/Terms">Terms of Service</Link>
      </div>
      <div>
          <p className="text-center mt-2">
            &copy; Made with love by Team Botcoders
          </p>
      </div>
  </div>
  </footer>
  );
}

export default Footer;

/*
  <FooterContainer>
      <FooterContent>
        <FooterContact>
          <p>Email: <a href="mailto:support@tixie.com">support@tixie.com<<a></p>
          <p>Customer Support: <a href="tel:+1234567890">+044-25262999<<a></p>
        </FooterContact>
        <div>
          <a href="#home">Home<<a>
          <a href="#about">About Us<<a>
          <Link to="/Terms">Terms of Service</Link>
          
        </div>
        <p className="text-center mt-2">
          &copy; Made with love by Team Botcoders
        </p>
      </FooterContent>
    </FooterContainer>
</footer>*/
