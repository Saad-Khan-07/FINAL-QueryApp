import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const toggleMic = () => {
    setIsMicActive(!isMicActive);
    // Handle microphone functionality here
  };

  const sendMessage = () => {
    if (input.trim()) {
      //input.trim to remove whitespaces, if user hasnt entered anything or only entered whitespaces, the function will return nothing and no message will be sent
      setMessages([...messages, { text: input, sender: "user" }]); //...messages creates a copy of messages array and adds the {text,sender} object to it and sets it as the new messages array
      setInput(""); //to clear the text field for user to type a new message
      // Here you can add a function to send the message to the backend or chatbot API
    }
  };

  return (
    <div className="cbot">
      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header" onClick={toggleChatbot}>
          <div className="icons">
            <i class="ri-robot-2-fill"></i> <i class="ri-chat-3-line"></i>
          </div>
          <h6>ask AI</h6>
        </div>
        {isOpen && (
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chatbot-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}><i class="ri-send-plane-fill"></i></button>
              <button onClick={toggleMic}>
        {isMicActive ? <i className="ri-mic-2-fill"></i> : <i className="ri-mic-2-line"></i>}
      </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
