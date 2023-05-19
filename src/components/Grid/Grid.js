import React from "react";
import "./Grid.css";

export default function Grid() {
  let arr = new Array(20);
  for (let i = 0; i < 20; i++) {
    arr[i] = new Array(64);
    for (let j = 0; j < 64; j++) {
      arr[i][j] = 0;
    }
  }

  function mark(event) {
    const elem = event.target;
    elem.style.backgroundColor = "red";
  }

  return (
    <div className="grid-container">
      <div className="cells-container">
        {arr.map((item, row) => {
          return item.map((cell, column) => {
            return <div key={column} className="cell" onClick={mark}></div>;
          });
        })}
      </div>
    </div>
  );
}
