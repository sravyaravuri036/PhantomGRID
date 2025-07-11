import React from "react";
import "../total_api_endpoints/total_api_endpoints_card.css";

function ApiEndpointsCard({ count = 0 }) {
  return (
    <div className="api-card">
      <h3>Total API Endpoints</h3>
      <div className="api-count">{count}</div>
      <p className="api-sub">Live count from backend</p>
    </div>
  );
}

export default ApiEndpointsCard;
