import React, { useState, useEffect } from 'react';
import LoginPage from '../pages/LoginNew';
import SignupPage from '../pages/SignupNew';

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbarContainer = document.querySelector('.navbar-container');

      if (window.scrollY > 500) {
        navbarContainer.classList.add('scrolled');
      } else {
        navbarContainer.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Tixie</div>
        <div className="navbar-container">
          <div className="navbar-links">
            <a href="#" className="navbar-link">Home</a>
            <a href="#about" className="navbar-link">About</a>
            <a href="#" className="navbar-link">Contact Us</a>
            <a 
              href="#" 
              className="navbar-link" 
              onClick={() => { 
                setShowLogin(true); 
                setShowSignup(false); 
              }}
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {showLogin && (
        <LoginPage 
          onClose={() => setShowLogin(false)} 
          openSignup={() => { 
            setShowLogin(false); 
            setShowSignup(true); 
          }}
        />
      )}

      {showSignup && (
        <SignupPage 
          onClose={() => setShowSignup(false)} 
          onSwitch={() => { 
            setShowSignup(false); 
            setShowLogin(true); 
          }}
        />
      )}
    </>
  );
}

export default Navbar;
