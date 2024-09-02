// src/components/Layout.jsx
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Container Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('/assets/bg.jpg'); /* Use absolute path */
  background-size: cover;
  background-position: center;
  background-color: transparent; /* Ensure no conflicting background color */
`;

// Box Styles
const Box = styled.div`
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.4); /* Glass effect */
  backdrop-filter: blur(10px); /* Glass effect */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: auto;
  position: relative;
`;

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.toLowerCase() === '/login' || pathname.toLowerCase() === '/signup') {
      document.body.classList.add('auth-background');
    } else {
      document.body.classList.remove('auth-background');
    }
    return () => {
      document.body.classList.remove('auth-background');
    };
  }, [pathname]);

  return (
    //<Container>
      <Box>
        {children}
      </Box>
    //</Container>
  );
};

export default Layout;
