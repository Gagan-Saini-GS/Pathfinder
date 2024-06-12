import React, { useState } from "react";
import "../Home/Home.css";
import ItemCard from "../Item-card/item-card";
import ReactSelect from "react-select";
import { algorithmOptions, m, mazeOptions, n } from "../../config";
import Animation1 from "../../Animations/Animation1";
import swal from "sweetalert";
import bfsWithWalls from "../../Algorithms/bfsWithWalls";
import dfsWithWalls from "../../Algorithms/dfsWithWalls";
import DijkstraWithWalls from "../../Algorithms/DijkstraWithWalls";
import recursiveDivisonMaze from "../../Algorithms/recursiveDivisonMaze";
import verticalSkew from "../../Algorithms/verticalSkew";
import horizontalSkew from "../../Algorithms/horizontalSkew";
import spiralMaze from "../../Algorithms/spiralMaze";
import Button from "../button/button";
import HoverCard from "../Hover/HoverCard";

const Navbar = ({
  placementType,
  setPlacementType,
  walls,
  setWalls,
  weights,
  setWeights,
  source,
  target,
}) => {
  const totalNodes = n * m;
  const [visualizing, setVisualizing] = useState(false);
  const [selectedMaze, setSelectedMaze] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  const itemCardOptions = [
    {
      id: "wall",
      label: "Wall",
      className: "control-item",
      placementText: "wall",
      imageSrc: "./images/wall.png",
      altText: "Wall Image Icon",
      message: "Wall blocks the path, you can't pass through it",
    },
    {
      id: "weight",
      label: "Weight",
      className: `control-item ${
        (selectedAlgorithm === "bfs" || selectedAlgorithm === "dfs") &&
        "cut-through"
      }`,
      placementText: "blue",
      imageSrc: "./images/weight.png",
      altText: "Weight Image Icon",
      message: "Weight adds 10kg weight to the path, you can pass through it",
    },
  ];

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
  };

  const markItem = (placementText, isCutThrough) => {
    // If item is cut then user should not able to select it.
    if (isCutThrough) return;
    setPlacementType(placementText);
  };

  const bfs = async () => {
    // Because BFS is not weighted.
    if (weights.length > 0) setWeights([]);

    const path = await bfsWithWalls(
      source.x,
      source.y,
      target.x,
      target.y,
      walls
    );

    if (path.length === 0) {
      const completed = await swal(
        "Oops!",
        "Target can't be reached",
        "warning"
      );
      if (completed) setVisualizing(false);
      return;
    }

    Animation1(path).then(() => {
      setVisualizing(false);
    });
  };

  const dfs = async () => {
    // Because DFS is not weighted.
    if (weights.length > 0) setWeights([]);

    const path = await dfsWithWalls(
      source.x,
      source.y,
      target.x,
      target.y,
      walls
    );

    if (path.length === 0) {
      const completed = await swal(
        "Oops!",
        "Target can't be reached",
        "warning"
      );
      if (completed) setVisualizing(false);
      return;
    }

    Animation1(path).then(() => {
      setVisualizing(false);
    });
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
      const completed = await swal(
        "Oops!",
        "Target can't be reached",
        "warning"
      );
      if (completed) setVisualizing(false);
      return;
    }
    Animation1(path).then(() => {
      setVisualizing(false);
    });
  };

  const createMaze = async () => {
    const walls = [];
    for (let i = 0; i < 300; i++) {
      const b = n * m;
      let x = Math.floor(b * Math.random());
      walls.push(x);
    }

    const cells = document.querySelectorAll(".cell");
    const x = source.x * m + source.y;
    const y = target.x * m + target.y;

    for (let i = 0; i < walls.length; i++) {
      if (walls[i] === x || walls[i] === y) {
        continue;
      }
      cells[walls[i]].style.backgroundColor = "#212a3e";
      cells[walls[i]].style.border = "1px solid #212a3e";

      setWalls((prev) => [...prev, walls[i]]);
    }
  };

  const createWeightMaze = async () => {
    const weightNodes = [];
    const isWeighted = new Array(n * m);
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

        weightNodes.push(x);
      }
    }

    for (let i = 0; i < weightNodes.length; i++) {
      setWeights((prev) => [...prev, weightNodes[i]]);
    }
  };

  const chooseMaze = async (selectedOption) => {
    const maze = selectedOption.value;
    setSelectedMaze(selectedOption.value);

    setVisualizing(true);

    clearBoard();
    switch (maze) {
      case "normal-maze": {
        createMaze();
        break;
      }
      case "recursive-divison-maze": {
        const wallArray = await recursiveDivisonMaze(source, target);
        setWalls(wallArray);
        break;
      }
      case "vertical-maze": {
        const wallArray = await verticalSkew(source, target);
        setWalls(wallArray);
        break;
      }
      case "horizontal-maze": {
        const wallArray = await horizontalSkew(source, target);
        setWalls(wallArray);
        break;
      }
      case "spiral-maze": {
        const wallArray = await spiralMaze(source, target);
        setWalls(wallArray);
        break;
      }
      case "weight-maze": {
        createWeightMaze();
        break;
      }
    }

    setVisualizing(false);
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
      // background placementType to white again weight is a img.
      if (isWall[i]) {
        continue;
      }

      cells[i].style.backgroundColor = "#fbfbfb";
      cells[i].style.border = "1px solid #5883d8";
    }
  };

  const startSolving = async () => {
    if (selectedAlgorithm === "") {
      swal("Error!", "Please select an algorithm", "error");
      return;
    }

    if (!visualizing) {
      clearPath();
    }

    setVisualizing(true);

    switch (selectedAlgorithm) {
      case "bfs": {
        await bfs();
        break;
      }
      case "dfs": {
        await dfs();
        break;
      }
      case "dijkstra": {
        await DijsktraAlgo();
        break;
      }
    }
  };

  return (
    <div>
      <div className="nav-container">
        <div className="nav-item">
          <div className="heading-section">Path Finder</div>
          <div className="control-section">
            {itemCardOptions.map((itemCard) => {
              return (
                <HoverCard message={itemCard.message}>
                  <ItemCard
                    key={itemCard.id}
                    text={itemCard.label}
                    className={itemCard.className}
                    onClick={() =>
                      markItem(
                        itemCard.placementText,
                        itemCard.className.includes("cut-through")
                      )
                    }
                    imageSrc={itemCard.imageSrc}
                    altText={itemCard.altText}
                  />
                </HoverCard>
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
                isDisabled={visualizing}
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
                isDisabled={visualizing}
              />
            </div>
          </div>
          <div>
            <Button
              ButtonText="Visualize"
              className={`play-button ${!visualizing && "nav-button"}`}
              onClick={startSolving}
              isDisabled={visualizing}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              ButtonText="Clear Path"
              className={`ml-2 ${!visualizing && "nav-button"}`}
              onClick={clearPath}
              isDisabled={visualizing}
            />
            <Button
              ButtonText="Clear"
              className={`ml-2 ${!visualizing && "nav-button"}`}
              onClick={clearBoard}
              isDisabled={visualizing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
