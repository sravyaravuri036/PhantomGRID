import React from "react";
import "../total_api_requests/total_api_requests.css";

function TotalApiRequestsCard({ count = 0 }) {
  return (
    <div className="api-card total-requests">
      <h3>Total API Requests</h3>
      <div className="api-count">{count}</div>
      <p className="api-sub">Overall request volume</p>
    </div>
  );
}

export default TotalApiRequestsCard;
