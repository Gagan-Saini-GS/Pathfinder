const n = 21;
const m = 51;

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
    if (i >= 1) edges[i][j].push((i - 1) * m + j);
    if (i + 1 < n) edges[i][j].push((i + 1) * m + j);
    if (j >= 1) edges[i][j].push(i * m + (j - 1));
    if (j + 1 < m) edges[i][j].push(i * m + (j + 1));
  }
}

// console.log(edges);

for (let i = 0; i < totalNodes; i++) {
  arr[i] = i;
  visited[i] = false;
}

let ans = [];

export default function bfs(sx, sy, tx, ty) {
  const source = sx * m + sy;
  const target = tx * m + ty;

  getPathBFS(source, target);
  // await getPathDFS(source, target);

  ans.reverse();
  return ans;
}

function getPathBFS(sv, ev) {
  let seen = new Array(totalNodes);
  for (let i = 0; i < totalNodes; i++) {
    seen[i] = -1;
  }

  let pendingVertices = []; // Works as queue

  pendingVertices.push(sv);
  visited[sv] = true;

  while (pendingVertices.length !== 0) {
    let frontVertices = pendingVertices.shift();
    let i = Math.floor(frontVertices / m);
    let j = frontVertices % m;

    for (let k = 0; k < edges[i][j].length; k++) {
      const node = edges[i][j][k];

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

  if (!visited[ev]) return;
  ans.push(ev);

  let x = ev;
  while (x !== sv) {
    x = seen[x];
    ans.push(x);
  }
}
