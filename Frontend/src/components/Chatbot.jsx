import React, { useState } from "react";
import { useChatHandler } from "../hooks/useChatHandler";

function Chatbot({ onClose }) {
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userInput = document.getElementById("chatbot-input").value;
    document.getElementById("chatbot-input").value = "";
    useChatHandler(userInput.trim());
    if (userInput.trim() !== "") {
      // Add user message to chat
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: userInput },
      ]);

      // Add a loading message placeholder
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Typing...", loading: true },
      ]);

      // Send message to backend and get bot response
      const botReply = await useChatHandler(userInput);

      // Replace the loading message with the actual bot response
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.loading ? { ...msg, text: botReply, loading: false } : msg
        )
      );
    }
  };

  return (
    <div className="chatbot-modal">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="chatbot-chat">
        {chatMessages.length === 0 && (
          <div className="start-chatting-text">
            <h1>Start chatting with Tixie</h1>
          </div>
        )}
        <div className="chatbot-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="chatbot-footer">
        <input
          type="text"
          id="chatbot-input"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
        />
        <button
          className="send-message"
          type="button"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
