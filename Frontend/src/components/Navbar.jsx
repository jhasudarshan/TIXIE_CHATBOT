import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import logo from '../assets/logo-no-background.svg';
import { useAuthContext } from '../context/AuthContext';

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const navbarContainer = document.querySelector('.navbar-container');
      const opacityValue = 1 - window.scrollY / 200;
  
      if (window.scrollY > 200) {
        navbarContainer.style.opacity = '0';
      } else {
        navbarContainer.style.opacity = opacityValue.toString();
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("chat-user");
    setAuthUser(null); // Clear authUser in context
    navigate('/'); // Redirect to homepage
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-container">
          <div className="navbar-links">
            <a href="#" className="navbar-link">Home</a>
            <a href="#about" className="navbar-link">About</a>
            <a href="#" className="navbar-link">Contact Us</a>
            {authUser ? (
              <a 
                href="#" 
                className="navbar-link" 
                onClick={handleLogout}
              >
                Log Out
              </a>
            ) : (
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
            )}
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
