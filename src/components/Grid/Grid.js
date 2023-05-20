import React, { useState } from "react";
import "./Grid.css";

export default function Grid() {
  // let arr = new Array(20);
  // for (let i = 0; i < 20; i++) {
  //   arr[i] = new Array(64);
  //   for (let j = 0; j < 64; j++) {
  //     arr[i][j] = 0;
  //   }
  // }

  const [arr, setArray] = useState([]);

  function addNumber() {
    const input = document.querySelector(".input").value;
    setArray((prev) => {
      return [...prev, input];
    });
    // This is sort hand
    // setArray((prev) => [...prev, input]);
  }

  function show() {
    console.log(arr);
  }

  function mark(event) {
    const elem = event.target;
    elem.style.backgroundColor = "red";
  }

  return (
    <div className="grid-container">
      <input className="input" />
      <button onClick={addNumber}>Add</button>
      <button onClick={show}>Show</button>
      {/* <div className="cells-container">
        {arr.map((item, row) => {
          return item.map((cell, column) => {
            return <div key={column} className="cell" onClick={mark}></div>;
          });
        })}
      </div> */}
    </div>
  );
}
