import React from "react";
import "../malicious_requests/malicious_requests.css";

function MaliciousRequestsCard({ count = 0 }) {
  return (
    <div className="api-card malicious">
      <h3>Total Malicious Requests</h3>
      <div className="api-count">{count}</div>
      <p className="api-sub">Threats detected across all endpoints</p>
    </div>
  );
}

export default MaliciousRequestsCard;
