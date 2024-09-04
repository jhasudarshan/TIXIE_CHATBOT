import React, { useState } from "react";
import "../styles/LoginNew.css";
import loginVideo from "../assets/Login-negate.mp4"; 
import { useSignin } from "../hooks/useSignin";

function LoginPage({ onClose, openSignup }) {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const {loading,signin} = useSignin();

  const handleSignin = async (e) => {
    e.preventDefault();
    await signin({email,password})
  }

  return (
    <div className="overlay">
      <div className="popup-window">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="left-section">
          <h2>Login</h2>
          <form onSubmit={handleSignin}>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Username" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="options-container">
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="login-button">
              {loading ? <span>loading</span> : "Sign In"}
            </button>
          </form>
          <div className="signup-link">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={() => {
                onClose();
                openSignup();
              }}
            >
              Sign Up
            </a>
          </div>
        </div>
        <div className="right-section">
          <video src={loginVideo} autoPlay loop muted /> 
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
