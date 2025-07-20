import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import ApiEndpointsCard from "./components/dashboard/total_api_endpoints/total_api_endpoints_card";
import NewEndpointsCard from "./components/dashboard/new_endpoints/new_endpoints";
import MaliciousRequestsCard from "./components/dashboard/malicious_requests/malicious_requests";
import DashboardRow from "./components/dashboard/dashboardrow";
import TotalApiRequestsCard from "./components/dashboard/total_api_requests/total_api_requests";
import ApiScorePanel from "./components/api_score_panel/api_score_panel";

// ✅ Import chatbot
import ApiDecodingChatbot from "./components/chatbot/chatbot";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  const totalEndpoints = 0;
  const newEndpoints = 0;
  const maliciousRequests = 0;

  return (
    <>
      <Navbar />
      <div className="App">
        <DashboardRow>
          <ApiEndpointsCard count={totalEndpoints} />
          <NewEndpointsCard count={newEndpoints} />
          <MaliciousRequestsCard count={maliciousRequests} />
          <TotalApiRequestsCard count={0} />
          <ApiScorePanel />
        </DashboardRow>
      </div>

      {/* ✅ Chatbot toggle button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="chatbot-toggle-button"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 10000,
          padding: "12px 16px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
        aria-label="Open API Chatbot"
      >
        💬
      </button>

      {/* ✅ Conditional chatbot */}
      {showChatbot && (
        <ApiDecodingChatbot
          onClose={() => setShowChatbot(false)}
          initialRequest=""
          position="bottom-right"
        />
      )}
    </>
  );
}

export default App;
