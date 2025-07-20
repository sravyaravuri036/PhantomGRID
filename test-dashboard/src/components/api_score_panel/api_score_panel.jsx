import React from "react";
import ApiScoreGauge from "./api_score_gauge/api_score_gauge";
import SubMetricCard from "./sub_metric_card/sub_metric_card";
import "../api_score_panel/api_score_panel.css";

function ApiScorePanel() {
  return (
    <div className="score-panel">
      <ApiScoreGauge score={61} />

      <div className="sub-metrics">
        <SubMetricCard title="Average Response Time" value="365" />
        <SubMetricCard title="Timeout Ratio" value="2.3%" />
        <SubMetricCard title="HTTPS Support" value="Yes" />
        <SubMetricCard title="JSON/XML Response" value="JSON" />
        <SubMetricCard title="Content Encoding" value="GZIP" />
        <SubMetricCard title="Error Ratio" value="5.2%" />
        <SubMetricCard title="Supports Versioning" value="Yes" />
      </div>
    </div>
  );
}

export default ApiScorePanel;
