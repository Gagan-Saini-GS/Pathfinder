import { n, m } from "../config";

export default async function Animation1(path) {
  return new Promise((resolve) => {
    const cells = document.querySelectorAll(".cell");
    const totalNodes = n * m;

    for (let i = 0; i < totalNodes; i++) {
      cells[i].classList.remove("path-animation");
    }

    const allID = [];

    for (let i = 0; i < path.length; i++) {
      const animatationID = setInterval(() => {
        cells[path[i]].style.backgroundColor = "rgb(255,254,106)";
        cells[path[i]].style.border = "1px solid rgb(255,254,106)";
        cells[path[i]].classList.add("path-animation");
      }, i * 35);

      allID.push(animatationID);
    }

    // It is used to clear intervals and avoid infinite calls from setinterval
    setTimeout(() => {
      for (let i = 0; i < allID.length; i++) {
        clearInterval(allID[i]);
      }

      resolve(true);
    }, path.length * 35);
  });
}
