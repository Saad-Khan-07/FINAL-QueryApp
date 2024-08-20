import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);import React, { useState, useEffect, useRef } from "react";


function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);
  const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const sendMessage = async () => {
    if (input.trim()) {
      // Add user's message to the chat
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        // Send user's message to the backend
        const response = await fetch('http://localhost:8000/api/chatbot/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: input }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const chatbotReply = data.response || "Sorry, I didn't understand that.";

        // Add bot's response to the chat
        const botMessage = { text: chatbotReply, sender: "bot" };
        setMessages(prevMessages => [...prevMessages, botMessage]);

      } catch (error) {
        console.error('Error:', error);
        const errorMessage = "Sorry, there was an error. Please try again.";
        setMessages(prevMessages => [...prevMessages, { text: errorMessage, sender: "bot" }]);
      }
    }
  };

  return (
    <div className="cbot">
      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header" onClick={toggleChatbot}>
          <div className="icons">
            <i className="ri-robot-2-fill"></i> <i className="ri-chat-3-line"></i>
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
              <div ref={messagesEndRef} /> {/* Scroll to this ref */}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>
                <i className="ri-send-plane-fill"></i>
              </button>
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
