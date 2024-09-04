import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginNew.css";
import loginVideo from "../assets/Login-negate.mp4"; 
import { useSignin } from "../hooks/useSignin";
import { useAuthContext } from "../context/AuthContext.jsx";

function LoginPage({ onClose, openSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, signin } = useSignin();
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const user = await signin({ email, password });
    if (user) {
      setAuthUser(user); // Set the authenticated user
      localStorage.setItem("chat-user", JSON.stringify(user)); // Store user in localStorage
      onClose(); // Close the login window
      navigate('/'); // Redirect to the homepage
    }
  };

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
                type="email" 
                placeholder="Email" 
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
              {loading ? <span>Loading...</span> : "Sign In"}
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
