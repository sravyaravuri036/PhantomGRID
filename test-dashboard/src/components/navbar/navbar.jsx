import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isActive, setIsActive] = useState(true);

  const toggleWAF = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="navbar-brand">PhantomGRID</div>
          <ul className="navbar-links">
            <li><a href="#">Chatbot</a></li>
            <li><a href="#">Alerts</a></li>
            <li><a href="#">Heatmap</a></li>
          </ul>
        </div>

        <div className="toggle-container">
          <span className="toggle-label">Active Mode:</span>
          <label className="switch">
            <input type="checkbox" checked={isActive} onChange={toggleWAF} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
