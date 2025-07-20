import React from "react";
import "../api_score_gauge/api_score_gauge.css";

function ApiScoreGauge({ score }) {
  const getColor = (score) => {
    if (score < 40) return "#ef4444"; // red
    if (score <= 70) return "#facc15"; // yellow
    return "#4ade80"; // green
  };

  return (
    <div className="gauge-container">
      <div className="gauge-circle" style={{ borderColor: getColor(score) }}>
        <span className="gauge-value">{score}/100</span>
      </div>
      <p className="gauge-label">API Score</p>
    </div>
  );
}

export default ApiScoreGauge;
