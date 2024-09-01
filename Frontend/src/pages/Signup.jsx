// src/pages/Signup.jsx
import React from 'react';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  const handleSignup = (event) => {
    event.preventDefault();
    // Handle signup logic here
  };

  return (
    <Layout>
      <AuthForm isSignup={true} onSubmit={handleSignup} />
    </Layout>
  );
};

export default Signup;

