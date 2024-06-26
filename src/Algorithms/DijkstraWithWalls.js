import { n, m } from "../config";
const totalNodes = n * m;

let visited = new Array(totalNodes);
let dist = new Array(totalNodes);
let isWeighted = new Array(totalNodes);
let walls = new Array(totalNodes);

for (let i = 0; i < totalNodes; i++) {
  visited[i] = false;
  isWeighted[i] = false;
  dist[i] = 1e9 + 7;
  walls[i] = -1;
}

let edges = new Array(n);

for (let i = 0; i < n; i++) {
  edges[i] = new Array(m);
  for (let j = 0; j < m; j++) {
    edges[i][j] = [];

    // I have to connect nodes in all 4 directions up, down, left, right
    if (i >= 1) edges[i][j].push((i - 1) * m + j); // UP
    if (j + 1 < m) edges[i][j].push(i * m + (j + 1)); // Right
    if (i + 1 < n) edges[i][j].push((i + 1) * m + j); // Down
    if (j >= 1) edges[i][j].push(i * m + (j - 1)); // Left
  }
}

let path = [];

async function restart() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < totalNodes; i++) {
    visited[i] = false;
    isWeighted[i] = false;
    dist[i] = 1e9 + 7;
    walls[i] = -1;
    cells[i].classList.remove("search-animation");
    cells[i].classList.remove("path-animation");
  }

  path = [];
}

// Function
export default async function DijkstraWithWalls(
  sx,
  sy,
  tx,
  ty,
  wallArray,
  weights
) {
  const source = sx * m + sy;
  const target = tx * m + ty;

  await restart();
  for (let i = 0; i < weights.length; i++) {
    isWeighted[weights[i]] = true;
  }

  for (let i = 0; i < wallArray.length; i++) {
    walls[wallArray[i]] = 1;
  }

  await shortestPath(source, target, walls);
  await getPath(source, target);

  if (path.length === 1) {
    // Means only target is pushed
    path.pop();
  }

  return path.reverse();
}

async function shortestPath(sv, ev, walls) {
  const cells = document.querySelectorAll(".cell");
  dist[sv] = 0;

  let q = [];
  q.push(sv);
  visited[sv] = true;

  while (q.length !== 0) {
    const currNode = q.shift();
    const x = Math.floor(currNode / m);
    const y = currNode % m;

    for (let i = 0; i < edges[x][y].length; i++) {
      const nextNode = edges[x][y][i];
      if (walls[nextNode] === 1) {
        continue;
      }
      let newDist = dist[currNode] + 1;

      let animationID;
      const temp = new Promise((resolve, reject) => {
        animationID = setInterval(() => {
          // cells[node].style.backgroundColor = "#9345c8";
          cells[nextNode].style.backgroundColor = "rgb(175, 216, 248)";
          cells[nextNode].classList.add("search-animation");

          resolve();
        }, 5);
      });

      await temp;
      clearInterval(animationID);

      if (nextNode === ev) {
        visited[ev] = true;
        break;
      }

      if (isWeighted[nextNode] === true) {
        newDist += 10; // 10 (because it is weighted)
      }

      if (newDist < dist[nextNode]) {
        dist[nextNode] = newDist;
        q.push(nextNode);
      }

      visited[nextNode] = true;
    }

    // if (visited[ev] === true && targetReached === 4) {
    //   break;
    // }
  }
}

async function getPath(source, target) {
  const q = [];
  path.push(target);
  q.push(target);

  while (q.length !== 0) {
    const currNode = q.shift();
    const x = Math.floor(currNode / m);
    const y = currNode % m;

    let minDist = 1e9 + 7;
    let pathNode = -1;

    for (let i = 0; i < edges[x][y].length; i++) {
      const nextNode = edges[x][y][i];
      if (dist[nextNode] < minDist) {
        minDist = dist[nextNode];
        pathNode = nextNode;
      }
    }

    if (pathNode === source) {
      path.push(pathNode);
      break;
    }
    if (pathNode !== -1) {
      path.push(pathNode);
      q.push(pathNode);
    }
  }
}
