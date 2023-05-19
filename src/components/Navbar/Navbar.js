import React from "react";
import "./Navbar.css";

export default function Navbar() {
  function markAsSource() {
    console.log("source");
  }

  function markAsTarget() {
    console.log("target");
  }

  function markAsWall() {
    console.log("wall");
  }

  return (
    <div className="nav-container">
      <div className="nav-item">
        <div className="heading-section">Path Finder</div>
      </div>
      <div className="nav-item">
        <div className="control-section">
          <div className="control-item" onClick={markAsSource}>
            <img src="./images/location.png" alt="" />
            <div>Source</div>
          </div>
          <div className="control-item" onClick={markAsTarget}>
            <img src="./images/bulleye.png" alt="" />
            <div>Target</div>
          </div>
          <div className="control-item" onClick={markAsWall}>
            <img src="./images/wall.png" alt="" />
            <div>Wall</div>
          </div>
        </div>
        <div className="algo-section">
          <div className="algo-btn">Dijkstra Algo</div>
          <div className="algo-btn">Prim's Algo</div>
        </div>
      </div>
    </div>
  );
}
