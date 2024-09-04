import React from 'react';
import "../styles/LoginNew.css";

function LoginPage({ onClose, openSignup }) {
  return (
    <div className="overlay">
      <div className="popup-window">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="left-section">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" />
            </div>
            <div className="options-container">
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          <div className="signup-link">
            Don't have an account? <a href="#" onClick={() => { onClose(); openSignup(); }}>Sign Up</a>
          </div>
        </div>
        <div className="right-section">
          <img src="/" alt="Picture" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
