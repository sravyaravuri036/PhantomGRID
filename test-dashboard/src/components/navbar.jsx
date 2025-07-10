import React from "react";
import "./Navbar.css"; // Optional if you're keeping styles separate

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">PhantomGRID</div>
      <ul className="navbar-links">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Alerts</a></li>
        <li><a href="#">Heatmap</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
