import React from "react";
import "../new_endpoints/new_endpoints.css";

function NewEndpointsCard({ count = 0 }) {
  return (
    <div className="api-card">
      <h3>Newly Discovered Endpoints</h3>
      <div className="api-count">{count}</div>
      <p className="api-sub">Count from backend</p>
    </div>
  );
}

export default NewEndpointsCard;
