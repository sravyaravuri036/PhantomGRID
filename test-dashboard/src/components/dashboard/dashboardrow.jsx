import React from "react";
import "../dashboard/dashboardrow.css";

function DashboardRow({ children }) {
  return <div className="dashboard-row">{children}</div>;
}

export default DashboardRow;
