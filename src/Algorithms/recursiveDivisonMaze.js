import { n, m } from "../config";
let arr = new Array(n);
for (let i = 0; i < n; i++) {
  arr[i] = new Array(m).fill(0);
}

export default async function recursiveDivisonMaze(source, target) {
  const cells = document.querySelectorAll(".cell");
  const sourceNode = source.x * m + source.y;
  const targetNode = target.x * m + target.y;

  addInnerWalls(true, 1, m - 2, 1, n - 2);
  addOuterWalls();

  const wallArray = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 1) {
        const node = i * m + j;
        if (node === sourceNode || node === targetNode) {
          continue;
        }
        wallArray.push(node);

        let animationID;
        const temp = new Promise((resolve, reject) => {
          animationID = setInterval(() => {
            cells[node].style.backgroundColor = "#212a3e";
            cells[node].style.border = "1px solid #212a3e";
            resolve();
          }, 5);
        });

        await temp;
        clearInterval(animationID);
      }
    }
  }

  return wallArray;
}

function addOuterWalls() {
  // For first & last row
  for (let j = 0; j < m; j++) {
    arr[0][j] = 1;
    arr[n - 1][j] = 1;
  }

  // For first & last column
  for (let i = 0; i < n; i++) {
    arr[i][0] = 1;
    arr[i][m - 1] = 1;
  }
}

function addInnerWalls(h, minX, maxX, minY, maxY) {
  if (h) {
    if (maxX - minX < 2) {
      return;
    }

    let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
    addHWall(minX, maxX, y);

    addInnerWalls(!h, minX, maxX, minY, y - 1);
    addInnerWalls(!h, minX, maxX, y + 1, maxY);
  } else {
    if (maxY - minY < 2) {
      return;
    }

    let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
    addVWall(minY, maxY, x);

    addInnerWalls(!h, minX, x - 1, minY, maxY);
    addInnerWalls(!h, x + 1, maxX, minY, maxY);
  }
}

function addHWall(minX, maxX, y) {
  const hole1 = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
  const hole2 = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

  for (let i = minX; i <= maxX; i++) {
    if (i === hole1 || i === hole2) arr[y][i] = 0;
    else arr[y][i] = 1;
  }
}

function addVWall(minY, maxY, x) {
  const hole1 = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  const hole2 = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

  for (let i = minY; i <= maxY; i++) {
    if (i === hole1 || i === hole2) arr[i][x] = 0;
    else arr[i][x] = 1;
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
