// src/components/Layout.jsx
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* Optional: Dark overlay */
`;

const Box = styled.div`
  background-color: #1e1e1e; /* Dark card background */
  padding: 30px 20px 30px 20px; /* Increased padding for a longer card */
  border-radius: 20px;
  
  width: 100%;
  max-width: 450px; /* Increased width */
  color: #ffffff; /* Ensure text is white */
  background-color: rgba(0, 0, 0, 0.4);; 
  backdrop-filter: blur(10px); /* Blurs the background behind the container */
  
  
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Light border for the glass effect */


`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Box>
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
