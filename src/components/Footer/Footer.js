import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-item">
        <div className="contact-me">
          <h3>Contact me</h3>
          <div className="contact-me-link">
            <a href="https://www.linkedin.com/in/gagan-saini-gs/">
              <img
                className="contact-me-icon"
                src="./images/linkedin.png"
                alt=""
              />
              <div>LinkedIn</div>
            </a>
          </div>
          <div className="contact-me-link">
            <a href="https://github.com/Gagan-Saini-GS">
              <img
                className="contact-me-icon"
                src="./images/github.png"
                alt=""
              />
              <div>GitHub</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
