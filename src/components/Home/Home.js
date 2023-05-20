import React, { useState } from "react";
import "./Home.css";
// import DijkstrasAlgo from "../../Algorithms/Dijsktra";
// import bfs from "../../Algorithms/bfs";
import bfsWithWalls from "../../Algorithms/bfsWithWalls";
import dfsWithWalls from "../../Algorithms/dfsWithWalls";
import swal from "sweetalert";
import Animation1 from "../../Animations/Animation1";

export default function Home() {
  const n = 25;
  const m = 71;
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      arr[i][j] = { i: i, j: j };
    }
  }

  const [color, setColor] = useState("red");
  const [source, setSource] = useState();
  const [target, setTarget] = useState();
  const [walls, setWalls] = useState([]);

  function mark(event) {
    const elem = event.target;
    const img = document.createElement("img");
    const x = Number(event.target.childNodes[0].childNodes[0].innerText);
    const y = Number(event.target.childNodes[0].childNodes[1].innerText);
    // console.log({ x, y });

    if (color === "red") {
      img.src = "./images/location.png";
      setSource({ x, y });
    } else if (color === "green") {
      img.src = "./images/bulleye.png";
      setTarget({ x, y });
    } else if (color === "black") {
      const wallNode = x * m + y;
      // console.log(wallNode);

      setWalls((prev) => [...prev, wallNode]);
      img.src = "./images/wall.png";
    }
    elem.appendChild(img);
  }

  function markAsSource() {
    setColor("red");
  }

  function markAsTarget() {
    setColor("green");
  }

  function markAsWall() {
    setColor("black");
  }

  function createMaze() {
    let temp = [];
    for (let i = 0; i < 300; i++) {
      // const a = 0;
      const b = n * m;
      let x = Math.floor(b * Math.random());
      temp.push(x);
    }

    const cells = document.querySelectorAll(".cell");

    for (let i = 0; i < temp.length; i++) {
      cells[temp[i]].style.backgroundImage = `url("./images/wall.png")`;
      // cells[temp[i]].style.backgroundColor = "red";
      const elem = cells[temp[i]];
      const img = document.createElement("img");
      img.src = "./images/wall.png";

      elem.appendChild(img);

      // marking them as wall
      const wallNode = temp[i];
      setWalls((prev) => [...prev, wallNode]);
    }
  }

  function bfs() {
    // const cells = document.querySelectorAll(".cell");
    // const path = bfs(source.x, source.y, target.x, target.y);
    // console.log(path);
    const path = bfsWithWalls(source.x, source.y, target.x, target.y, walls);

    if (path.length === 0) {
      swal("Oops!", "Target can't be reached", "warning");
    }
    Animation1(source, target, path);

    // for (let i = 0; i < path.length; i++) {
    //   const x = Math.floor(path[i] / m);
    //   const y = path[i] % m;

    //   if (x === source.x && y === source.y) continue;
    //   if (x === target.x && y === target.y) continue;

    //   const node = x * m + y;
    //   cells[node].style.backgroundColor = "lightgreen";
    // }
  }

  function dfs() {
    // const cells = document.querySelectorAll(".cell");
    const path = dfsWithWalls(source.x, source.y, target.x, target.y, walls);

    if (path.length === 0) {
      swal("Oops!", "Target can't be reached", "warning");
    }

    Animation1(source, target, path);
  }

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="nav-container">
        <div className="nav-item">
          <div className="heading-section">Path Finder</div>
          <div className="stop-btn">Stop Animation</div>
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
            <div className="control-item" onClick={createMaze}>
              <img src="./images/maze.png" alt="" />
              <div>Create Maze</div>
            </div>
          </div>
          <div className="algo-section">
            <div className="algo-btn" onClick={bfs}>
              BFS Algo
            </div>
            <div className="algo-btn" onClick={dfs}>
              DFS Algo
            </div>
            <div className="algo-btn">Prim's Algo</div>
          </div>
        </div>
      </div>

      {/* Grid */}

      <div className="grid-container">
        <div className="cells-container">
          {arr.map((item, row) => {
            return item.map((cell, column) => {
              return (
                <div key={column} className="cell" onClick={mark}>
                  <div className="value">
                    <span className="value-x">{cell.i}</span>
                    <span className="value-y">{cell.j}</span>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
