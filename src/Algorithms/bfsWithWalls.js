const n = 20;
const m = 50;
// Previos or Same as BFS

const totalNodes = n * m; // Number of total nodes
// const totalEdges = (n - 1) * m + n * (m - 1); // Number of total edges
let visited = new Array(totalNodes);

// let arr = new Array(n * m);
let edges = new Array(n);
let seen = new Array(totalNodes);
let walls = new Array(totalNodes);

for (let i = 0; i < n; i++) {
  edges[i] = new Array(m);
  for (let j = 0; j < m; j++) {
    edges[i][j] = [];
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    // I have to connect nodes in all 4 directions up, down, left, right
    if (i >= 1) edges[i][j].push((i - 1) * m + j);
    if (i + 1 < n) edges[i][j].push((i + 1) * m + j);
    if (j >= 1) edges[i][j].push(i * m + (j - 1));
    if (j + 1 < m) edges[i][j].push(i * m + (j + 1));
  }
}

// console.log(edges);

for (let i = 0; i < totalNodes; i++) {
  // arr[i] = i;
  visited[i] = false;
  seen[i] = -1;
  walls[i] = -1;
  // cells[i].classList.remove("serach-animation");
}

let ans = [];

async function restart() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < totalNodes; i++) {
    // arr[i] = i;
    visited[i] = false;
    seen[i] = -1;
    walls[i] = -1;
    cells[i].classList.remove("search-animation");
    cells[i].classList.remove("path-animation");
  }

  ans = [];
}

export default async function bfsWithWalls(sx, sy, tx, ty, walls) {
  const source = sx * m + sy;
  const target = tx * m + ty;
  //   console.log(walls);

  await restart();

  await getPathBFSWalls(source, target, walls);

  ans.reverse();

  // console.log(ans);
  return ans;
}

async function getPathBFSWalls(sv, ev, temp) {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < temp.length; i++) {
    walls[temp[i]] = 1; // 1 denote the blockage or wall
  }

  //   console.log(walls);

  let pendingVertices = []; // Works as queue

  pendingVertices.push(sv);
  visited[sv] = true;

  while (pendingVertices.length !== 0) {
    let frontVertices = pendingVertices.shift();
    let i = Math.floor(frontVertices / m);
    let j = frontVertices % m;

    for (let k = 0; k < edges[i][j].length; k++) {
      const node = edges[i][j][k];
      if (walls[node] === 1) {
        continue;
      }

      let animationID;
      const temp = new Promise((resolve, reject) => {
        animationID = setInterval(() => {
          cells[node].classList.add("search-animation");
          cells[node].style.backgroundColor = "rgb(175, 216, 248)";
          // cells[node].style.backgroundColor = "#5883d8";

          resolve();
        }, 5);
      });

      await temp;
      clearInterval(animationID);

      // console.log("Called");
      if (node === ev) {
        // frontvertices is the parent the node
        seen[node] = frontVertices;
        visited[ev] = true;
        break;
      }

      if (!visited[node]) {
        pendingVertices.push(node);
        // frontvertices is the parent the node
        seen[node] = frontVertices;
        visited[node] = true;
      }
    }

    if (visited[ev]) {
      break;
    }
  }

  //Getting path
  if (!visited[ev]) return;
  ans.push(ev);

  let x = ev;
  while (x !== sv) {
    x = seen[x];
    ans.push(x);
  }
}
