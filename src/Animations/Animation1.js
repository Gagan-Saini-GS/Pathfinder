// const n = 25;
// const m = 71;

export default async function Animation1(source, target, path) {
  const allID = [];

  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < path.length; i++) {
    const animatationID = setInterval(() => {
      //   const x = Math.floor(path[i] / m);
      //   const y = path[i] % m;

      //   if (x === source.x && y === source.y) continue;
      //   if (x === target.x && y === target.y) continue;

      //   const node = x * m + y;
      //   cells[node].style.backgroundColor = "#588b76";
      cells[path[i]].style.backgroundColor = "#588b76";
    }, i * 50);

    allID.push(animatationID);
  }

  // It is used to clear intervals and avoid infinite calls from setinterval
  setTimeout(() => {
    for (let i = 0; i < allID.length; i++) {
      clearInterval(allID[i]);
    }
  }, path.length * 50);
}
