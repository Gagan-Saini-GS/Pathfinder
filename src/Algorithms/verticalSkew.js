const n = 21;
const m = 51;

let arr = new Array(n);
for (let i = 0; i < n; i++) {
  arr[i] = new Array(m);
  for (let j = 0; j < m; j++) {
    arr[i][j] = 0;
  }
}

export default async function verticalSkew(source, target) {
  const cells = document.querySelectorAll(".cell");
  const sourceNode = source.x * m + source.y;
  const targetNode = target.x * m + target.y;

  addInnerWalls();
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

function addInnerWalls() {
  for (let i = 2; i < m - 1; i += 2) {
    addVerticalLine(i);
  }
}

function addVerticalLine(col) {
  const hole1 = randomNumber(1, n - 2);
  const hole2 = randomNumber(1, n - 2);
  for (let i = 1; i < n - 1; i++) {
    if (i !== hole1 && i !== hole2) {
      arr[i][col] = 1;
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
