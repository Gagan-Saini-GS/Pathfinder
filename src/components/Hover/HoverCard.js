// HoverCard.js
import React from "react";
import "./HoverCard.css";

const HoverCard = ({ message, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip">{message}</div>
    </div>
  );
};

export default HoverCard;
