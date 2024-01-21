import React, { useEffect, useState } from "react";
import "./Home.css";
import bfsWithWalls from "../../Algorithms/bfsWithWalls";
import dfsWithWalls from "../../Algorithms/dfsWithWalls";
import DijkstraWithWalls from "../../Algorithms/DijkstraWithWalls";
import swal from "sweetalert";
import Animation1 from "../../Animations/Animation1";
import recursiveDivisonMaze from "../../Algorithms/recursiveDivisonMaze";
import verticalSkew from "../../Algorithms/verticalSkew";
import horizontalSkew from "../../Algorithms/horizontalSkew";
import spiralMaze from "../../Algorithms/spiralMaze";
import Button from "../button/button";
import ReactSelect from "react-select";
import ItemCard from "../Item-card/item-card";
import { n, m } from "../../config";

export default function Home() {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      arr[i][j] = { i: i, j: j };
    }
  }
  const totalNodes = n * m;

  const [color, setColor] = useState("red");
  const [walls, setWalls] = useState([]);
  const [weights, setWeights] = useState([]);
  const [visualized, setvisualized] = useState(false);
  const [selectedMaze, setSelectedMaze] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [source, setSource] = useState({ x: 10, y: 15 });
  const [target, setTarget] = useState({ x: 10, y: 35 });

  useEffect(() => {
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

  const clearWeights = () => {
    const cells = document.querySelectorAll(".cell");
    const len = weights.length;
    for (let i = 0; i < len; i++) {
      const elem = cells[weights[i]];

      if (elem.hasChildNodes()) {
        elem.removeChild(elem.children[1]);
      }
    }
  };

  const clearBoard = () => {
    setSelectedMaze("");
    const cells = document.querySelectorAll(".cell");
    const totalNodes = n * m;

    for (let i = 0; i < totalNodes; i++) {
      cells[i].style.backgroundColor = "#fbfbfb";
      cells[i].style.border = "1px solid #5883d8";
    }

    setWalls([]);
    setWeights([]);
    clearWeights();
  };

  const markItem = (colorText, isCutThrough) => {
    // If item is cut then user should not able to select it.
    if (isCutThrough) return;
    setColor(colorText);
  };

  const mark = (event) => {
    const elem = event.target;
    const img = document.createElement("img");
    const cells = document.querySelectorAll(".cell");

    if (event.target.tagName === "IMG") return;

    const x = Number(event.target.childNodes[0].childNodes[0].innerText);
    const y = Number(event.target.childNodes[0].childNodes[1].innerText);

    if (color === "red") {
      const node = cells[source.x * m + source.y];
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

      setWalls((prev) => [...prev, wallNode]);
      cells[wallNode].style.backgroundColor = "#212a3e";
      cells[wallNode].style.border = "1px solid #212a3e";
    } else if (color === "blue") {
      const weightNode = x * m + y;
      setWeights((prev) => [...prev, weightNode]);
      img.src = "./images/weight.png";
    }
    elem.appendChild(img);
  };

  const createMaze = async () => {
    clearBoard();
    let temp = [];
    for (let i = 0; i < 300; i++) {
      const b = n * m;
      let x = Math.floor(b * Math.random());
      temp.push(x);
    }

    const cells = document.querySelectorAll(".cell");
    const x = source.x * m + source.y;
    const y = target.x * m + target.y;

    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === x || temp[i] === y) {
        continue;
      }
      cells[temp[i]].style.backgroundColor = "#212a3e";
      cells[temp[i]].style.border = "1px solid #212a3e";
      // marking them as wall
      const wallNode = temp[i];
      setWalls((prev) => [...prev, wallNode]);
    }
  };

  // Recursive divison maze
  const recursiveDivison = async () => {
    clearBoard();
    const wallArray = await recursiveDivisonMaze(source, target);
    setWalls(wallArray);
  };

  const vertical = async () => {
    clearBoard();
    const wallArray = await verticalSkew(source, target);
    setWalls(wallArray);
  };

  const horizontal = async () => {
    clearBoard();
    const wallArray = await horizontalSkew(source, target);
    setWalls(wallArray);
  };

  const spiral = async () => {
    clearBoard();
    const wallArray = await spiralMaze(source, target);
    setWalls(wallArray);
  };

  const createWeightMaze = async () => {
    clearBoard();
    let temp = [];
    let isWeighted = new Array(n * m);
    const totalNodes = n * m;

    for (let i = 0; i < totalNodes; i++) {
      isWeighted[i] = false;
    }
    isWeighted[source.x * m + source.y] = true;
    isWeighted[target.x * m + target.y] = true;

    for (let i = 0; i < 300; i++) {
      const b = n * m;
      let x = Math.floor(b * Math.random());
      if (isWeighted[x] === false) {
        isWeighted[x] = true;
        temp.push(x);
      }
    }

    const cells = document.querySelectorAll(".cell");

    for (let i = 0; i < temp.length; i++) {
      const elem = cells[temp[i]];
      const img = document.createElement("img");
      img.src = "./images/weight.png";

      elem.appendChild(img);

      // marking them as weight
      const weightNode = temp[i];
      setWeights((prev) => [...prev, weightNode]);
    }
  };

  const bfs = async () => {
    // Because BFS is not weighted.
    if (weights.length > 0) clearWeights();

    const path = await bfsWithWalls(
      source.x,
      source.y,
      target.x,
      target.y,
      walls
    );

    if (path.length === 0) {
      swal("Oops!", "Target can't be reached", "warning");
      return;
    }

    Animation1(source, target, path);
  };

  const dfs = async () => {
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
      return;
    }

    Animation1(source, target, path);
  };

  const DijsktraAlgo = async () => {
    const path = await DijkstraWithWalls(
      source.x,
      source.y,
      target.x,
      target.y,
      walls,
      weights
    );

    if (path.length === 0) {
      swal("Oops!", "Target not found", "warning");
      return;
    }

    Animation1(source, target, path);
  };

  const chooseMaze = (selectedOption) => {
    const maze = selectedOption.value;
    setSelectedMaze(selectedOption.value);

    switch (maze) {
      case "normal-maze": {
        createMaze();
        break;
      }
      case "recursive-divison-maze": {
        recursiveDivison();
        break;
      }
      case "vertical-maze": {
        vertical();
        break;
      }
      case "horizontal-maze": {
        horizontal();
        break;
      }
      case "plus-maze": {
        spiral();
        break;
      }
      case "weight-maze": {
        createWeightMaze();
        break;
      }
    }
  };

  const chooseAlgo = (selectedOption) => {
    setSelectedAlgorithm(selectedOption.value);
  };

  const clearPath = () => {
    setSelectedMaze("");
    const cells = document.querySelectorAll(".cell");
    const isWall = new Array(totalNodes);

    for (let i = 0; i < totalNodes; i++) {
      isWall[i] = false;
    }

    for (let i = 0; i < walls.length; i++) {
      isWall[walls[i]] = true;
    }

    for (let i = 0; i < totalNodes; i++) {
      // weight is not considered here because I have to change there
      // background color to white again weight is a img.
      if (isWall[i]) {
        continue;
      }

      cells[i].style.backgroundColor = "#fbfbfb";
      cells[i].style.border = "1px solid #5883d8";
    }
  };

  const mazeOptions = [
    {
      label: "Normal Maze",
      value: "normal-maze",
    },
    {
      label: "Recusive Divison Maze",
      value: "recursive-divison-maze",
    },
    {
      label: "Vertical Maze",
      value: "vertical-maze",
    },
    {
      label: "Horizontal Maze",
      value: "horizontal-maze",
    },
    {
      label: "Plus Maze",
      value: "plus-maze",
    },
    {
      label: "Weight Maze",
      value: "weight-maze",
    },
  ];

  const algorithmOptions = [
    {
      label: "BFS",
      value: "bfs",
    },
    {
      label: "DFS",
      value: "dfs",
    },
    {
      label: "Dijkstra",
      value: "dijkstra",
    },
  ];

  const itemCardOptions = [
    {
      id: "source",
      label: "Source",
      className: "control-item",
      colorText: "red",
      imageSrc: "./images/location.png",
      altText: "Socuce Image Icon",
    },
    {
      id: "target",
      label: "Target",
      className: "control-item",
      colorText: "green",
      imageSrc: "./images/bulleye.png",
      altText: "Target Image Icon",
    },
    {
      id: "wall",
      label: "Wall",
      className: "control-item",
      colorText: "black",
      imageSrc: "./images/wall.png",
      altText: "Wall Image Icon",
    },
    {
      id: "weight",
      label: "Weight",
      className: `control-item ${
        (selectedAlgorithm === "bfs" || selectedAlgorithm === "dfs") &&
        "cut-through"
      }`,
      colorText: "blue",
      imageSrc: "./images/weight.png",
      altText: "Weight Image Icon",
    },
  ];

  const startSolving = () => {
    setvisualized(true);

    switch (selectedAlgorithm) {
      case "bfs": {
        bfs();
        break;
      }
      case "dfs": {
        dfs();
        break;
      }
      case "dijkstra": {
        DijsktraAlgo();
        break;
      }
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="nav-container">
        <div className="nav-item">
          <div className="heading-section">Path Finder</div>
          <div className="control-section">
            {itemCardOptions.map((itemCard) => {
              return (
                <ItemCard
                  key={itemCard.id}
                  text={itemCard.label}
                  className={itemCard.className}
                  onClick={() =>
                    markItem(
                      itemCard.colorText,
                      itemCard.className.includes("cut-through")
                    )
                  }
                  imageSrc={itemCard.imageSrc}
                  altText={itemCard.altText}
                />
              );
            })}
          </div>
        </div>
        <div className="nav-item">
          <div className="flex justify-center items-center">
            <div style={{ width: "200px", paddingRight: "8px" }}>
              <ReactSelect
                options={mazeOptions}
                onChange={chooseMaze}
                selectedValue={selectedMaze}
                placeholder="Select Maze"
                isMulti={false}
                isClearable={false}
              />
            </div>
            <div style={{ width: "200px", paddingRight: "8px" }}>
              <ReactSelect
                options={algorithmOptions}
                onChange={chooseAlgo}
                selectedValue={selectedAlgorithm}
                placeholder="Select Algorithm"
                isMulti={false}
                isClearable={false}
              />
              {visualized && selectedAlgorithm === "" && (
                <span className="validation-message">Pick an Algorithm</span>
              )}
            </div>
          </div>
          <div>
            <Button
              ButtonText="Visualize"
              className="play-button"
              onClick={startSolving}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              ButtonText="Clear Path"
              className="ml-2"
              onClick={clearPath}
            />
            <Button ButtonText="Clear" className="ml-2" onClick={clearBoard} />
          </div>
        </div>
      </div>

      {/* My Components */}
      {/* <Select
        options={mazeOptions}
        className="maze-options algo-item"
        handleChange={chooseMaze}
        selectedValue={selectedMaze}
        placeholder="Select a Maze"
      />
      <Select
        options={algorithmOptions}
        className="maze-options algo-item"
        handleChange={chooseAlgo}
        selectedValue={selectedAlgorithm}
        placeholder="Select a Algorithm"
      /> */}

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
