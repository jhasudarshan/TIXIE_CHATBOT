import React, { useState } from "react";
import "../styles/SignupNew.css";
import signupVideo from "../assets/Sign Up Login-negate.mp4";
import useSignup from "../hooks/useSignup";

function SignupPage({ onClose, onSwitch }) {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();

  const { loading, signup } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup({ name, email, password, confirmPassword})
  }

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
          <form onSubmit={handleSignup}>
            <div className="signup-input-group">
              <input 
                type="text" 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="signup-input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signup-input-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="signup-button">
              {loading ? <span>loading</span> : "Sign Up"}
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
