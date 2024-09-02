import React, { useState } from 'react';

function Chatbot({ onClose }) {
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const userInput = document.getElementById("chatbot-input").value;
    if (userInput.trim() !== "") {
      setChatMessages(prevMessages => [
        ...prevMessages,
        { type: "user", text: userInput },
        { type: "bot", text: "This is a reply" },
      ]);
      document.getElementById("chatbot-input").value = "";
    }
  };

  return (
    <div className="chatbot-modal">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
      <div className="chatbot-chat">
        <div className="chatbot-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="chatbot-footer">
        <input type="text" id="chatbot-input" placeholder="Type a message..." />
        <button className="send-message" type="button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
