import React from "react";
import "../sub_metric_card/sub_metric_card.css";

function SubMetricCard({ title, value }) {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
    </div>
  );
}

export default SubMetricCard;
