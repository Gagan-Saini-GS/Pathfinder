import React, { useState } from "react";
import "./Home.css";
import swal from "sweetalert";
import { n, m } from "../../config";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      arr[i][j] = { i: i, j: j };
    }
  }

  const [placementType, setPlacementType] = useState("source");
  const [walls, setWalls] = useState([]);
  const [weights, setWeights] = useState([]);

  const [source, setSource] = useState({ x: 10, y: 15 });
  const [target, setTarget] = useState({ x: 10, y: 35 });

  const checkForWall = (cell, nodeType) => {
    const isCellWall = walls.filter((wall) => {
      return wall === cell.i * m + cell.j;
    });

    if (isCellWall.length > 0) {
      swal("Error!", `${nodeType} can't be a wall`, "error");
      return true;
    }

    return false;
  };

  const onDrag = (e, cell) => {
    if (cell.i == source.x && cell.j == source.y) {
      setPlacementType("source");
    } else if (cell.i == target.x && cell.j == target.y) {
      setPlacementType("target");
    } else if (placementType !== "wall") {
      setPlacementType("wall");
    }
  };

  const onDrop = (event, cell) => {
    const cells = document.querySelectorAll(".cell");

    if (placementType === "source" && !checkForWall(cell, "Source")) {
      setSource({ x: cell.i, y: cell.j });
    } else if (placementType === "target" && !checkForWall(cell, "Target")) {
      setTarget({ x: cell.i, y: cell.j });
    } else if (placementType === "wall") {
      const wallNode = cell.i * m + cell.j;

      setWalls((prev) => [...prev, wallNode]);
      cells[wallNode].style.backgroundColor = "#212a3e";
      cells[wallNode].style.border = "1px solid #212a3e";
    }
  };

  const onDragOver = (e, cell) => {
    e.preventDefault();

    // Can't create wall on source & target
    if (
      (cell.i === source.x && cell.j === source.y) ||
      (cell.i === target.x && cell.j === target.y)
    ) {
      return;
    }

    if (placementType === "wall") {
      const cells = document.querySelectorAll(".cell");
      const wallNode = cell.i * m + cell.j;

      setWalls((prev) => [...prev, wallNode]);
      cells[wallNode].style.backgroundColor = "#212a3e";
      cells[wallNode].style.border = "1px solid #212a3e";
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar
        placementType={placementType}
        setPlacementType={setPlacementType}
        walls={walls}
        setWalls={setWalls}
        weights={weights}
        setWeights={setWeights}
        source={source}
        target={target}
      />

      {/* Table can be used in responsivness */}
      {/* Thats why I changed a normal div structure to table */}
      <div className="grid-container">
        <table className="cells-container">
          <tbody>
            {arr.map((item, row) => {
              return (
                <tr key={row}>
                  {item.map((cell, column) => {
                    return (
                      <td
                        key={column}
                        className="cell"
                        draggable={true}
                        onDrag={(e) => onDrag(e, cell)}
                        onDragOver={(e) => {
                          onDragOver(e, cell);
                        }}
                        onDrop={(e) => onDrop(e, cell)}
                      >
                        {cell.i === source.x && cell.j === source.y && (
                          <img src="./images/location.png" alt="source" />
                        )}
                        {cell.i === target.x && cell.j === target.y && (
                          <img src="./images/bulleye.png" alt="target" />
                        )}

                        {weights.includes(cell.i * m + cell.j) && (
                          <img src="./images/weight.png" alt="Weight" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
