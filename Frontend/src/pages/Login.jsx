// src/pages/Login.jsx
import React from 'react';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    const rememberMe = event.target.rememberMe.checked;
  };

  return (
    <Layout>
      <AuthForm isSignup={false} onSubmit={handleLogin} />
    </Layout>
  );
};

export default Login;


