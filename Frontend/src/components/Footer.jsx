import React from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 20px 0;
  text-align: center;
  
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const FooterContact = styled.div`
  margin-bottom: 15px;
`;

const FooterLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4500;
  }
`;


function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterContact>
          <p>Email: <FooterLink href="mailto:support@example.com">support@example.com</FooterLink></p>
          <p>Customer Support: <FooterLink href="tel:+1234567890">+1 (234) 567-890</FooterLink></p>
        </FooterContact>
        <div>
          <FooterLink href="#about">About Us</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
        </div>
        <p className="text-center mt-2">
          &copy; Made with love by Team Botcoders
        </p>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;

/*function Footer() {
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

export default Footer;*/
