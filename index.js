const COLS = 100;
const ROWS = 64;
const WIDTH = 10;

let startItem = [5, 5];
let endItem = [5, 15];

let grid = [];
let visited = [];
let distance = [];
let dir = [];
let seen = [];

let movingStart = false;
let movingEnd = false;
let drawing = false;
let removing = false;

setup();

function setup(reset) {
  document.getElementById("gridBox").innerHTML = "";
  for (let i = 0; i < ROWS; i++) {
    grid[i] = [];
    visited[i] = [];
    distance[i] = [];
    dir[i] = [];
    seen[i] = [];
    for (let j = 0; j < COLS; j++) {
      visited[i][j] = false;
      distance[i][j] = Infinity;
      dir[i][j] = null;
      seen[i][j] = false;
      grid[i].push(document.createElement("div"));
      grid[i][j].classList = "gridItem";
      if (reset === true) {
        grid[i][j].style = "background-color: white";
      }
      grid[i][j].setAttribute("onclick", `if (visited[${i}][${j}] === true && drawing === false) removing = true; else if (drawing === true) drawing = false; else drawing = true; moveNode(${i}, ${j})`);
      grid[i][j].setAttribute("onmouseover", `moveNode(${i}, ${j})`);
      if (i === startItem[0] && j === startItem[1]) {
        grid[i][j].style = "background-color: #41658A";
        distance[i][j] = 0;
        grid[i][j].setAttribute("onclick", `if(movingStart === true) movingStart = false; else movingStart = true`);
        grid[i][j].setAttribute("onmouseover", "");
      } else if (i === endItem[0] && j === endItem[1]) {
        grid[i][j].style = "background-color: #FA8334";
        grid[i][j].setAttribute("onclick", `if(movingEnd === true) movingEnd = false; else movingEnd = true`);
        grid[i][j].setAttribute("onmouseover", "");
      }
      document.getElementById("gridBox").appendChild(grid[i][j]);
    }
    let divider = document.createElement("div");
    divider.style = "flex-basis: 100%; height: 0";
    document.getElementById("gridBox").appendChild(divider);
  }
}

function changeColour(i, j, color, animation) {
  grid[i][j].style = `animation: ${animation} 500ms ease; background-color: ${color}`;
}

function followPath(x, y) {
  if (x === startItem[0] && y === startItem[1]) return;
  if (dir[x][y] === "d") {
    if (x + 1 === startItem[0] && y === startItem[1]) return;
    changeColour(x + 1, y, "#FFCAAF", "final-path");
    setTimeout(function () { followPath(x + 1, y) }, 10);
  }
  if (dir[x][y] === "u") {
    if (x - 1 === startItem[0] && y === startItem[1]) return;
    changeColour(x - 1, y, "#FFCAAF", "final-path");
    setTimeout(function () { followPath(x - 1, y) }, 10);
  }
  if (dir[x][y] === "r") {
    if (x === startItem[0] && y - 1 === startItem[1]) return;
    changeColour(x, y - 1, "#FFCAAF", "final-path");
    setTimeout(function () { followPath(x, y - 1) }, 10);
  }
  if (dir[x][y] === "l") {
    if (x === startItem[0] && y + 1 === startItem[1]) return;
    changeColour(x, y + 1, "#FFCAAF", "final-path");
    setTimeout(function () { followPath(x, y + 1) }, 10);
  }
}

function moveNode(x, y) {
  if (movingStart === true) {
    startItem = [x, y];
    setup();
  }
  if (movingEnd === true) {
    endItem = [x, y];
    setup();
  }
  if (drawing === true) {
    changeColour(x, y, 'blue');
    visited[x][y] = true;
  }
  if (removing === true) {
    changeColour(x, y, 'white');
    visited[x][y] = false;
    removing = false;
  }
}

function reset() {
  grid = [];
  visited = [];
  distance = [];
  dir = [];
  setup(reset);
}