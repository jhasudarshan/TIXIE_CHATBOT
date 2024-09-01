import { useState } from "react";
import{Link} from 'react-router-dom';
import Navbar from "../components/Navbar";
import OverlayText from "../components/OverlayText";
import Chatbot from "../components/Chatbot";
import AboutUsBox from "../components/AboutUsBox";
import '../styles/App.css';
function Home() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
    const handleOpenChatbot = () => {
      setIsChatbotOpen(true);
    };
  
    const handleCloseChatbot = () => {
      setIsChatbotOpen(false);
    };
  
    return (
      
      <>
        <video
          className="background-video-fixed"
          autoPlay
          muted
          loop
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1000,
          }}
        >
          <source src="/videoplayback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        <Navbar />
  
        <section id="home" className="section section-one">
          <OverlayText />
          <button className="chatbot-button" onClick={handleOpenChatbot}>
            Open Chatbot
          </button>
        </section>
  
        {isChatbotOpen && (
          <Chatbot onClose={handleCloseChatbot} />
        )}
  
        <section id="about" className="section section-two">
          <AboutUsBox />
        </section>
  
        <footer id="contact" className="footer footer-three">
          <div className="footer-container">
            <p className="text-center">Some text in the center</p>
            <div className="d-flex justify-content-center">
              <a href="#about" className="mx-2">About</a>
              <a href="#contact" className="mx-2">Contact</a>
              <Link to="./Login">Login</Link>
            </div>
            <p className="text-center mt-2">&copy; Made with love by Team Botcoders</p>
          </div>
        </footer>
      </>
    );
  }
  export default Home;