// src/components/AuthForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthForm.css';

const AuthForm = ({ isSignup, onSubmit }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="heading">{isSignup ? 'Create an Account' : 'Welcome Back'}</h2>
      {isSignup && <input className="input" type="text" placeholder="Full Name" required />}
      <input className="input" type="email" placeholder="Email" required />
      <input className="input" type="password" placeholder="Password" required />
      {!isSignup && (
        <div className="options-container">
          <label className="remember-me">
            <input type="checkbox" id="rememberMe" />
            Remember Me
          </label>
          <div className="forgot-password">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </div>
        </div>
      )}
      <button className="button" type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
      <div className="switch-link">
        {isSignup ? (
          <Link to="/Login">Already have an account? Log In</Link>
        ) : (
          <Link to="/Signup">Don't have an account? Sign Up</Link>
        )}
      </div>
    </form>
  );
};

export default AuthForm;













/*import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #2c2c2c;
  color: #ffffff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
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

const SwitchLink = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #ffffff ;
  a {
    color: #ffffff ;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Ensures horizontal alignment with space between 
  align-items: center;
  margin-bottom: 20px;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  color: #ffffff;

  input {
    margin-right: 5px;
  }
`;

const ForgotPassword = styled.div`
  color: #ffffff;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #ffffff;
  align-items:center;
  padding-bottom:10px;
`;

const AuthForm = ({ isSignup, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Heading>{isSignup ? 'Create an Account' : 'Welcome Back'}</Heading>
      {isSignup && <Input type="text" placeholder="Full Name" required />}
      <Input type="email" placeholder="Email" required />
      <Input type="password" placeholder="Password" required />
      {!isSignup && (
        <OptionsContainer>  {/* Using the OptionsContainer here }
          <RememberMe>
            <input type="checkbox" id="rememberMe" />
            Remember Me
          </RememberMe>
          <ForgotPassword>
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </ForgotPassword>
        </OptionsContainer>
      )}
      <Button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</Button>
      <SwitchLink>
        {isSignup ? (
          <Link to="/Login" >Already have an account? Log In</Link>
        ) : (
          <Link to="/Signup" >Don't have an account? Sign Up</Link>
        )}
      </SwitchLink>
    </Form>
  );
};

export default AuthForm;*/




