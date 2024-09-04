import React from "react";

import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import Terms from './pages/Terms';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={<Layout><Login /></Layout>} />
      <Route path="/ForgotPassword" element={<Layout>< ForgotPassword/></Layout>} />
      <Route path="/Signup" element={<Layout><Signup /></Layout>} />
      <Route path="/Terms" element={<Terms/>} />
      </Routes>
    </Router>
  );
};


export default App;
