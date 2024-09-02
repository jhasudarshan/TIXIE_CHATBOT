import React from 'react';

function AboutUsBox() {
  return (
    <div className="about-us-box">
      <h2>Why to use our Tixie chatbot?</h2>
      <hr />
      <div className="box-content">
        <div className="left-content">
          <img src="/assets/logo.png" alt="Logo" />
          <p>Tixie</p>
        </div>
        <div className="right-content">
          <p>Meet our AI-powered chatbot! It:</p>
          <br />
          <p>‣ Provides detailed information on a variety of Indian museums, helping you explore cultural gems.</p>
          <p>‣ Allows seamless ticket booking with just a few clicks, saving you time and effort.</p>
          <p>‣ Suggests museums based on your interests for a personalized experience.</p>
          <p>‣ Keeps you updated with the latest events, exhibits, and any schedule changes.</p>
          <br />
          <p>Discover and plan your next museum visit with ease and convenience!</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsBox;
