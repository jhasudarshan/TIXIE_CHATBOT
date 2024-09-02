import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import AboutUsBox from "../components/AboutUsBox";
import Footer from "../components/Footer";
import "../styles/App.css";

const Home = () => {  
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const videoRef = useRef(null);

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <>
      <div className="video-container">
        <video ref={videoRef} loop muted>
          <source src="/videoplayback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Navbar />

      <section id="home" className="section section-one">
        <div className="homepage-container">
          <div className="left-container">
            <div className="homepage-text">
              <h3>WELCOME<br/>TO</h3>
              <h1>Tixie</h1>
              <h4>Book tickets seamlessly with AI</h4>
            </div>
          </div>
          <div className="right-container">
            <button className="chatbot-button" onClick={handleOpenChatbot}>
              Open Chatbot
            </button>
          </div>
        </div>
      </section>

      {isChatbotOpen && <Chatbot onClose={handleCloseChatbot} />}

      <section id="about" className="section section-two">
        <AboutUsBox />
      </section>

      <Footer />
    </>
  );
};

export default Home; 
