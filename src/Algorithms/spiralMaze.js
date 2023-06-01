const n = 21;
const m = 51;

let arr = new Array(n);
for (let i = 0; i < n; i++) {
  arr[i] = new Array(m);
  for (let j = 0; j < m; j++) {
    arr[i][j] = 0;
  }
}

export default async function spiralMaze(source, target) {
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

function addInnerWalls() {
  let firstRow = 2;
  let firstCol = 2;
  let lastRow = n - 3;
  let lastCol = m - 3;
  let count = 5;

  while (count > 0) {
    // Top Row
    for (let j = firstCol; j < lastCol; j++) {
      arr[firstRow][j] = 1;
    }

    // Right Column
    for (let i = firstRow; i < lastRow; i++) {
      arr[i][lastCol] = 1;
    }

    // Bottom Row
    for (let j = lastCol; j >= firstCol; j--) {
      arr[lastRow][j] = 1;
    }

    // Left Column
    for (let i = lastRow; i >= firstRow; i--) {
      arr[i][firstCol] = 1;
    }

    firstRow += 2;
    firstCol += 2;
    lastRow -= 2;
    lastCol -= 2;

    count--;
  }

  for (let i = 3; i < n - 2; i += 2) {
    arr[i][i - 1] = 0;
  }

  for (let i = 2; i < n - 2; i += 2) {
    arr[i][i - 1] = 1;
  }
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
