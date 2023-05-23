import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <h2>Build By Gagan Saini</h2>
      <div className="tech-used-container">
        <h3>Tech Used</h3>
        <div className="tech-used-box">
          <div className="tech-used-item">React.js</div>
          <div className="tech-used-item">Javascript</div>
          <div className="tech-used-item">Data Structure & Algorithms</div>
        </div>
      </div>
    </div>
  );
}
