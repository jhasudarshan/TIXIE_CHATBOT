import React from "react";
import "../styles/SignupNew.css";
import signupVideo from "../assets/Sign Up Login-negate.mp4";

function SignupPage({ onClose, onSwitch }) {
  return (
    <div className="overlay">
      <div className="signup-popup-window">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="signup-left-section">
          <video src={signupVideo} autoPlay loop muted />
        </div>
        <div className="signup-right-section">
          <h2>Sign Up</h2>
          <form>
            <div className="signup-input-group">
              <input type="text" placeholder="Username" />
            </div>
            <div className="signup-input-group">
              <input type="email" placeholder="Email" />
            </div>
            <div className="signup-input-group">
              <input type="password" placeholder="Password" />
            </div>
            <div className="signup-input-group">
              <input type="password" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="login-link">
            Already have an account?{" "}
            <a href="#" onClick={onSwitch}>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
