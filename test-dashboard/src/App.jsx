import React from "react";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import ApiEndpointsCard from "./components/dashboard/total_api_endpoints/total_api_endpoints_card";
import NewEndpointsCard from "./components/dashboard/new_endpoints/new_endpoints";
import MaliciousRequestsCard from "./components/dashboard/malicious_requests/malicious_requests";
import DashboardRow from "./components/dashboard/dashboardrow";

function App() {
  const totalEndpoints = 277;
  const newEndpoints = 37;
  const maliciousRequests = 134;

  return (
    <>
      <Navbar />
      <div className="App">
        <DashboardRow>
          <ApiEndpointsCard count={totalEndpoints} />
          <NewEndpointsCard count={newEndpoints} />
          <MaliciousRequestsCard count={maliciousRequests} />
        </DashboardRow>
      </div>
    </>
  );
}

export default App;
