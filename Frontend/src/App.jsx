import React from "react";

import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginNew';
import SignupPage from './pages/SignupNew';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};


export default App;
