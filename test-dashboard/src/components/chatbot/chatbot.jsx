// ApiDecodingChatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../chatbot/chatbot.css'; // Make sure this file exists

const ApiDecodingChatbot = ({ onClose, initialRequest, position = 'bottom-right' }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const positionClasses = {
    'bottom-right': 'chatbot-bottom-right',
    'bottom-left': 'chatbot-bottom-left',
    'top-right': 'chatbot-top-right',
    'top-left': 'chatbot-top-left',
  };

  useEffect(() => {
    setMessages([{
      id: 1,
      text: "👋 Hi! I'm your API request assistant. You can:\n\n• Paste a full API request\n• Describe your API issue\n• Ask about HTTP methods, headers, or status codes",
      sender: 'bot',
      timestamp: new Date(),
    }]);

    if (initialRequest) {
      try {
        const formattedRequest = typeof initialRequest === 'string' 
          ? initialRequest 
          : JSON.stringify(initialRequest, null, 2);
        setInput(formattedRequest);
      } catch (e) {
        setInput("Invalid request format");
      }
    }
  }, [initialRequest]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [messages]);

  const handleSend = async () => {
    const userInput = input.trim();
    if (!userInput) return;

    const userMessage = { 
      id: Date.now(), 
      text: userInput, 
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await analyzeRequest(userInput);
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now() + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        }
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now() + 1,
          text: "⚠️ Sorry, I encountered an error. Please try again with more details.",
          sender: 'bot',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };



 const analyzeRequest = async (requestText) => {
  const GEMINI_API_KEY = "AIzaSyC6aUxslNwhYBuEO4cJagQRm3kPRVr5Ikk"; // <-- Replace with your real key
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
   // Only allow API-relevant queries
  const isLikelyApiRequest = /(GET|POST|PUT|DELETE|PATCH|HEAD)\b|https?:\/\/|api\.|{[^}]*}|headers|Authorization|Content-Type/i.test(
    requestText
  );

  if (!isLikelyApiRequest) {
    return "⚠️ I'm only able to analyze API requests. Please paste a request or describe an issue related to an API.";
  }


  const prompt = `
You are a professional API security and debugging assistant.

Given the following API request or description:

\`\`\`
${requestText}
\`\`\`

Perform the following:
1. 🧩 **Break down** the HTTP method, URL, headers, and body.
2. 🔎 **Identify potential issues**, such as:
   - Missing or incorrect headers
   - Invalid or poorly structured body
   - Authentication gaps
   - Incorrect usage of HTTP methods
   - Deprecated endpoints
   - Query parameter misuse
3. 🔐 **Perform a security assessment**, including:
   - Presence of sensitive data in URL, headers, or body
   - Use (or lack) of HTTPS
   - Missing authentication or improper API key handling
   - Risk of injection attacks (e.g., SQLi, command injection)
   - Rate limiting and abuse prevention
4. 💡 **Suggest improvements**, both functional and security-related.
5. 🛡️ **Red-flag clearly malicious patterns**, like:
   - Attempted injection
   - Authorization bypass
   - API misuse attempts

Respond with clear formatting using:
- **Bold** for section titles
- ✅ or ⚠️ icons to indicate healthy or risky parts
- Code blocks for examples
- Bullet points for clarity
`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await fetch(GEMINI_API_URL + `?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) throw new Error("No valid response from Gemini");

    return reply;
  } catch (err) {
    console.error("Gemini Error:", err);
    return "⚠️ Gemini failed to analyze your request. Please check your API key, quota, or request format.";
  }
};





  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`api-decoding-chatbot ${positionClasses[position]}`}>
      <div className="chatbot-header">
        <div className="chatbot-title">
          <h3>API Request Assistant</h3>
          <span className="chatbot-subtitle">I can help decode your API requests</span>
        </div>
        <button onClick={onClose} className="chatbot-close-btn" aria-label="Close chatbot">
          &times;
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chatbot-message chatbot-message-${msg.sender}`}>
            <div className="chatbot-message-content">
              {msg.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
            <div className="chatbot-message-time">
              {formatTime(msg.timestamp)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chatbot-message chatbot-message-bot">
            <div className="chatbot-typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input-area">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste API request or describe your issue..."
          disabled={isLoading}
          rows={3}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !input.trim()}
          className="chatbot-send-btn"
        >
          {isLoading ? (
            <span className="chatbot-spinner"></span>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );
};

ApiDecodingChatbot.propTypes = {
  onClose: PropTypes.func.isRequired,
  initialRequest: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
};

export default ApiDecodingChatbot;
