function h(x, y) {
  let dx = endItem[0] - x;
  let dy = endItem[1] - y;
  return Math.sqrt(dx * dx + dy * dy);
}

function g(x, y) {
  let dx = startItem[0] - x;
  let dy = startItem[1] - y;
  return Math.sqrt(dx * dx + dy * dy);
}

function aStar(x, y) {
  if (x === endItem[0] && y === endItem[1]) {
    if (x - 1 === prevVisited[0]) {
      dir[x][y] = "r";
    }
    if (x + 1 === prevVisited[0]) {
      dir[x][y] = "l";
    }
    if (y - 1 === prevVisited[1]) {
      dir[x][y] = "u";
    }
    if (y + 1 === prevVisited[1]) {
      dir[x][y] = "d";
    }
    followPath(x, y);
    console.log("solved");
    return;
  }
  if (x - 1 !== -1 && x - 1 < ROWS && visited[x - 1][y] === false) {
    if (
      (seen[x - 1][y] === true && distance[x - 1][y] > distance[x][y] + 1) ||
      seen[x - 1][y] !== true
    ) {
      distance[x - 1][y] = distance[x][y] + 1;
      seen[x - 1][y] = true;
      dir[x - 1][y] = "d";
    }
  }
  if (x + 1 !== 0 && x + 1 < ROWS && visited[x + 1][y] === false) {
    if (
      (seen[x + 1][y] === true && distance[x + 1][y] > distance[x][y] + 1) ||
      seen[x + 1][y] !== true
    ) {
      distance[x + 1][y] = distance[x][y] + 1;
      seen[x + 1][y] = true;
      dir[x + 1][y] = "u";
    }
  }
  if (y - 1 !== -1 && y - 1 < COLS && visited[x][y - 1] === false) {
    if (
      (seen[x][y - 1] === true && distance[x][y - 1] > distance[x][y] + 1) ||
      seen[x][y - 1] !== true
    ) {
      distance[x][y - 1] = distance[x][y] + 1;
      seen[x][y - 1] = true;
      dir[x][y - 1] = "l";
    }
  }
  if (y + 1 !== 0 && y + 1 < COLS && visited[x][y + 1] === false) {
    if (
      (seen[x][y + 1] === true && distance[x][y + 1] > distance[x][y] + 1) ||
      seen[x][y + 1] !== true
    ) {
      distance[x][y + 1] = distance[x][y] + 1;
      seen[x][y + 1] = true;
      dir[x][y + 1] = "r";
    }
  }
  if (diagonal === true) {
    if (y + 1 !== 0 && y + 1 < COLS && visited[x + 1][y + 1] === false) {
      if (
        (seen[x + 1][y + 1] === true &&
          distance[x + 1][y + 1] > distance[x][y] + 1.5) ||
        seen[x + 1][y + 1] !== true
      ) {
        distance[x + 1][y + 1] = distance[x][y] + 1.5;
        seen[x + 1][y + 1] = true;
        dir[x + 1][y + 1] = "dr";
      }
    }
    if (y + 1 !== 0 && y + 1 < COLS && visited[x + 1][y - 1] === false) {
      if (
        (seen[x + 1][y - 1] === true &&
          distance[x + 1][y - 1] > distance[x][y] + 1.5) ||
        seen[x + 1][y - 1] !== true
      ) {
        distance[x + 1][y - 1] = distance[x][y] + 1.5;
        seen[x + 1][y - 1] = true;
        dir[x + 1][y - 1] = "ur";
      }
    }
    if (y + 1 !== 0 && y + 1 < COLS && visited[x - 1][y + 1] === false) {
      if (
        (seen[x - 1][y + 1] === true &&
          distance[x - 1][y + 1] > distance[x][y] + 1.5) ||
        seen[x - 1][y + 1] !== true
      ) {
        distance[x - 1][y + 1] = distance[x][y] + 1.5;
        seen[x - 1][y + 1] = true;
        dir[x - 1][y + 1] = "dl";
      }
    }
    if (y + 1 !== 0 && y + 1 < COLS && visited[x - 1][y - 1] === false) {
      if (
        (seen[x - 1][y - 1] === true &&
          distance[x - 1][y - 1] > distance[x][y] + 1.5) ||
        seen[x - 1][y - 1] !== true
      ) {
        distance[x - 1][y - 1] = distance[x][y] + 1.5;
        seen[x - 1][y - 1] = true;
        dir[x - 1][y - 1] = "ul";
      }
    }
  }
  visited[x][y] = true;
  if (!(x === startItem[0] && y === startItem[1])) {
    changeColour(x, y, "#A7BED3", "searched");
  }
  seen[x][y] = true;
  let current = [-1, -1, Infinity];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let ga = distance[i][j];
      let ha = h(i, j);
      let f = ga + ha;
      if (f < current[2] && seen[i][j] === true && visited[i][j] === false) {
        current = [i, j, f];
      }
    }
  }

  setTimeout(() => {
    aStar(current[0], current[1]);
  }, 0);
}
