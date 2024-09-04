import React from 'react';
import "../styles/SignupNew.css"; // Ensure this path is correct

function SignupPage({ onClose, onSwitch }) {
  return (
    <div className="overlay">
      <div className="signup-popup-window">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="signup-left-section">
          <img src="path-to-your-image.jpg" alt="Signup Image" />
        </div>
        <div className="signup-right-section">
          <h2>Sign Up</h2>
          <form>
            <div className="signup-input-group">
              <input type="email" placeholder="Email" />
            </div>
            <div className="signup-input-group">
              <input type="text" placeholder="Username" />
            </div>            
            <div className="signup-input-group">
              <input type="password" placeholder="Password" />
            </div>
            <div className="signup-input-group">
              <input type="confirm-password" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="login-link">
            <br/>
            Already have an account? <a href="#" onClick={onSwitch}>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
