import { n, m } from "../config";

const totalNodes = n * m; // Number of total nodes
// const totalEdges = (n - 1) * m + n * (m - 1); // Number of total edges
let visited = new Array(totalNodes);
let walls = new Array(totalNodes);

let edges = new Array(n);
for (let i = 0; i < n; i++) {
  edges[i] = new Array(m);
  for (let j = 0; j < m; j++) {
    edges[i][j] = [];
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    // I have to connect nodes in all 4 directions up, down, left, right
    if (i >= 1) edges[i][j].push((i - 1) * m + j); // UP
    if (j + 1 < m) edges[i][j].push(i * m + (j + 1)); // Right
    if (i + 1 < n) edges[i][j].push((i + 1) * m + j); // Down
    if (j >= 1) edges[i][j].push(i * m + (j - 1)); // Left
  }
}

for (let i = 0; i < totalNodes; i++) {
  visited[i] = false;
  walls[i] = -1;
}

let ans = [];

async function restart() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < totalNodes; i++) {
    // arr[i] = i;
    visited[i] = false;
    walls[i] = -1;
    cells[i].classList.remove("search-animation");
    cells[i].classList.remove("path-animation");
  }

  ans = [];
}

export default async function dfsWithWalls(sx, sy, tx, ty, wallArray) {
  const source = sx * m + sy;
  const target = tx * m + ty;

  await restart();

  for (let i = 0; i < wallArray.length; i++) {
    walls[wallArray[i]] = 1; // 1 denote the blockage or wall
  }

  await getPathDFSWalls(source, target, walls);

  if (ans.length > 0) {
    ans.push(source);
  }

  ans.reverse();

  return ans;
}

async function getPathDFSWalls(sv, ev, walls) {
  const cells = document.querySelectorAll(".cell");
  if (visited[sv]) return;
  if (walls[sv] === 1) return;

  if (sv === ev) {
    ans.push(ev);
    visited[ev] = true;
    return;
  }

  const x = Math.floor(sv / m);
  const y = sv % m;

  visited[sv] = true;

  for (let i = 0; i < edges[x][y].length; i++) {
    const newNode = edges[x][y][i];

    if (walls[newNode] === 1) {
      continue;
    }

    let animationID;
    const temp = new Promise((resolve, reject) => {
      animationID = setInterval(() => {
        cells[newNode].classList.add("search-animation");
        cells[newNode].style.backgroundColor = "rgb(175, 216, 248)";
        resolve();
      }, 5);
    });

    await temp;
    clearInterval(animationID);

    await getPathDFSWalls(newNode, ev, walls);

    if (ans.length !== 0) {
      if (newNode !== ev) {
        ans.push(newNode);
      }

      if (visited[ev]) {
        return;
      }
    }
  }
}
