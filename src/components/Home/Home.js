import React, { useEffect, useState } from "react";
import "./Home.css";
// import bfs from "../../Algorithms/bfs";
import bfsWithWalls from "../../Algorithms/bfsWithWalls";
import dfsWithWalls from "../../Algorithms/dfsWithWalls";
// import Dijkstra from "../../Algorithms/Dijsktra";
import DijkstraWithWalls from "../../Algorithms/DijkstraWithWalls";
import swal from "sweetalert";
import Animation1 from "../../Animations/Animation1";

export default function Home() {
  const n = 20;
  const m = 50;
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      arr[i][j] = { i: i, j: j };
    }
  }

  const [color, setColor] = useState("red");
  const [source, setSource] = useState({ x: 10, y: 15 });
  const [target, setTarget] = useState({ x: 10, y: 35 });
  const [walls, setWalls] = useState([]);
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    // console.log("Effect");
    const cells = document.querySelectorAll(".cell");
    const source = 10 * m + 15;
    const target = 10 * m + 35;

    const sourceImg = document.createElement("img");
    sourceImg.src = "./images/location.png";

    const targetImg = document.createElement("img");
    targetImg.src = "./images/bulleye.png";

    cells[source].appendChild(sourceImg);
    cells[target].appendChild(targetImg);
  }, []);

  function mark(event) {
    const elem = event.target;
    const img = document.createElement("img");
    const cells = document.querySelectorAll(".cell");
    const x = Number(event.target.childNodes[0].childNodes[0].innerText);
    const y = Number(event.target.childNodes[0].childNodes[1].innerText);
    // console.log({ x, y });

    if (color === "red") {
      const node = cells[source.x * m + source.y];
      // cells[node];

      if (node.hasChildNodes()) {
        node.removeChild(node.children[1]);
      }
      img.src = "./images/location.png";
      setSource({ x, y });
    } else if (color === "green") {
      const node = cells[target.x * m + target.y];
      if (node.hasChildNodes()) {
        node.removeChild(node.children[1]);
      }

      img.src = "./images/bulleye.png";
      setTarget({ x, y });
    } else if (color === "black") {
      const wallNode = x * m + y;
      // console.log(wallNode);

      setWalls((prev) => [...prev, wallNode]);
      // img.src = "./images/wall.png";
      cells[wallNode].style.backgroundColor = "#212a3e";
    } else if (color === "blue") {
      const weightNode = x * m + y;
      setWeights((prev) => [...prev, weightNode]);
      img.src = "./images/weight.png";
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

  function markAsWeight() {
    setColor("blue");
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
      // cells[temp[i]].style.backgroundImage = `url("./images/wall.png")`;
      cells[temp[i]].style.backgroundColor = "#212a3e";
      cells[temp[i]].style.border = "1px solid #212a3e";
      // const elem = cells[temp[i]];
      // const img = document.createElement("img");
      // img.src = "./images/wall.png";

      // elem.appendChild(img);

      // marking them as wall
      const wallNode = temp[i];
      setWalls((prev) => [...prev, wallNode]);
    }
  }

  function createWeightMaze() {
    let temp = [];
    let isWeighted = new Array(n * m);
    const totalNodes = n * m;

    for (let i = 0; i < totalNodes; i++) {
      isWeighted[i] = false;
    }
    isWeighted[source.x * m + source.y] = true;
    isWeighted[target.x * m + target.y] = true;

    for (let i = 0; i < 300; i++) {
      // const a = 0;
      const b = n * m;
      let x = Math.floor(b * Math.random());
      if (isWeighted[x] === false) {
        isWeighted[x] = true;
        temp.push(x);
      }
    }

    const cells = document.querySelectorAll(".cell");

    for (let i = 0; i < temp.length; i++) {
      // cells[temp[i]].style.backgroundImage = `url("./images/weight.png")`;
      // cells[temp[i]].style.backgroundColor = "red";
      const elem = cells[temp[i]];
      const img = document.createElement("img");
      img.src = "./images/weight.png";

      elem.appendChild(img);

      // marking them as weight
      const weightNode = temp[i];
      // setWalls((prev) => [...prev, wallNode]);
      setWeights((prev) => [...prev, weightNode]);
    }
  }

  function clearWeights() {
    const cells = document.querySelectorAll(".cell");
    const len = weights.length;
    for (let i = 0; i < len; i++) {
      const elem = cells[weights[i]];

      if (elem.hasChildNodes()) {
        elem.removeChild(elem.children[1]);
      }
    }
    // console.log(weights);
  }

  async function bfs() {
    // const cells = document.querySelectorAll(".cell");
    // const path = bfs(source.x, source.y, target.x, target.y);
    // console.log(path);

    // Because BFS is not weighted.
    if (weights.length > 0) clearWeights();

    // console.log("BFS");
    const path = await bfsWithWalls(
      source.x,
      source.y,
      target.x,
      target.y,
      walls
    );

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

  async function dfs() {
    // const cells = document.querySelectorAll(".cell");
    const path = await dfsWithWalls(
      source.x,
      source.y,
      target.x,
      target.y,
      walls
    );

    // Because DFS is not weighted.
    if (weights.length > 0) clearWeights();

    if (path.length === 0) {
      swal("Oops!", "Target can't be reached", "warning");
    }

    Animation1(source, target, path);
  }

  async function DijsktraAlgo() {
    // console.log("Dijsktra called");

    // Without wall
    // const path = await Dijkstra(
    //   source.x,
    //   source.y,
    //   target.x,
    //   target.y,
    //   weights
    // );

    // With Wall
    const path = await DijkstraWithWalls(
      source.x,
      source.y,
      target.x,
      target.y,
      walls,
      weights
    );

    // console.log(path);
    Animation1(source, target, path);
  }

  function clearWeightsAndWalls() {
    const cells = document.querySelectorAll(".cell");
    const totalNodes = n * m;

    for (let i = 0; i < totalNodes; i++) {
      cells[i].style.backgroundColor = "#fbfbfb";
      cells[i].style.border = "1px solid #5883d8";
    }

    setWalls([]);
    setWeights([]);
    clearWeights();
    console.log("Path Cleared");
  }

  return (
    <div className="home-container">
      {/* Navbar */}
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
              {/* <img src="./images/wall.png" alt="" /> */}
              <div className="wall-block"></div>
              <div>Wall</div>
            </div>
            <div className="control-item" onClick={markAsWeight}>
              <img src="./images/weight.png" alt="" />
              <div>Weight</div>
            </div>
            <div className="control-item" onClick={createMaze}>
              <img src="./images/maze.png" alt="" />
              <div>Create Maze</div>
            </div>
            <div className="control-item" onClick={createWeightMaze}>
              <img src="./images/maze.png" alt="" />
              <div>Weight Maze</div>
            </div>
          </div>
          <div className="algo-section">
            <div className="algo-btn" onClick={bfs}>
              BFS Algo
            </div>
            <div className="algo-btn" onClick={dfs}>
              DFS Algo
            </div>
            <div className="algo-btn" onClick={DijsktraAlgo}>
              Dijkstra Algo
            </div>
            <div className="algo-btn" onClick={clearWeightsAndWalls}>
              Clear Weights & Walls
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}

      {/* <div className="grid-container">
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
      </div> */}

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
                      <td key={column} className="cell" onClick={mark}>
                        <div className="value">
                          <span className="value-x">{cell.i}</span>
                          <span className="value-y">{cell.j}</span>
                        </div>
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
