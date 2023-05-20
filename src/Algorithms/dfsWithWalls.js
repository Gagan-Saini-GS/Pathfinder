const n = 25;
const m = 71;

// Previos or Same as BFS

let visited = new Array(n * m);
const totalNodes = n * m; // Number of total nodes
// const totalEdges = (n - 1) * m + n * (m - 1); // Number of total edges

let arr = new Array(n * m);
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

// console.log(edges);

for (let i = 0; i < totalNodes; i++) {
  arr[i] = i;
  visited[i] = false;
}

let ans = [];

export default function dfsWithWalls(sx, sy, tx, ty, wallArray) {
  const source = sx * m + sy;
  const target = tx * m + ty;
  //   console.log(walls);
  let walls = new Array(totalNodes);
  for (let i = 0; i < totalNodes; i++) {
    walls[i] = -1; // -1 means not blocked
  }

  for (let i = 0; i < wallArray.length; i++) {
    walls[wallArray[i]] = 1; // 1 denote the blockage or wall
  }

  getPathDFSWalls(source, target, walls);
  ans.reverse();
  //   console.log(ans);
  return ans;
}

function getPathDFSWalls(sv, ev, walls) {
  if (visited[sv]) return;
  if (walls[sv] === 1) return;

  if (sv === ev) {
    ans.push(ev);
    visited[ev] = true;
    return;
  }

  const x = Math.floor(sv / m);
  const y = sv % m;

  //   console.log(sv);

  visited[sv] = true;

  for (let i = 0; i < edges[x][y].length; i++) {
    const newNode = edges[x][y][i];
    getPathDFSWalls(newNode, ev, walls);

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
