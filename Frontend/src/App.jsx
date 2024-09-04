import React from "react";

import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginNew';
import SignupPage from './pages/SignupNew';
import Terms from './pages/Terms';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/LoginNew" element={<LoginPage />} />
      <Route path="/SignupNew" element={<SignupPage />} />
      <Route path="/Terms" element={<Terms/>} />
      </Routes>
    </Router>
  );
};


export default App;
