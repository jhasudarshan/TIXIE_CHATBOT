// src/pages/ForgotPassword.jsx
import React from 'react';
import Layout from '../components/Layout';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #2c2c2c;
  color: #ffffff;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #ffffff;
`;

const ForgotPassword = () => {
  const handleForgotPassword = (event) => {
    event.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <Layout>
      <Heading>Reset Your Password</Heading>
      <Form onSubmit={handleForgotPassword}>
        <Input type="email" placeholder="Enter your email" required />
        <Button type="submit">Reset Password</Button>
      </Form>
    </Layout>
  );
};

export default ForgotPassword;
