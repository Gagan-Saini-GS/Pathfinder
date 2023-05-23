// Preprocessing & Decleration

const n = 21;
const m = 57;

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

// Function
export default async function Dijkstra(sx, sy, tx, ty, wallArray, weights) {
  const source = sx * m + sy;
  const target = tx * m + ty;

  for (let i = 0; i < weights.length; i++) {
    isWeighted[weights[i]] = true;
  }

  for (let i = 0; i < wallArray.length; i++) {
    walls[wallArray[i]] = 1;
  }

  await shortestPath(source, target, walls);
  await getPath(source, target);
  path.reverse();

  return path;
}

async function shortestPath(sv, ev, walls) {
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

      if (isWeighted[nextNode] === true) {
        newDist += 10; // 10 (because it is weighted)
      }

      if (newDist < dist[nextNode]) {
        dist[nextNode] = newDist;
        q.push(nextNode);
      }

      visited[nextNode] = true;
    }
  }
}

async function getPath(source, target) {
  let q = [];
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

    path.push(pathNode);
    if (pathNode === source) {
      break;
    }

    q.push(pathNode);
  }
}
