function dijkstras(x, y) {
  if (x === -1 || y === -1) {
    console.log("unsolvable");
    return;
  }
  if (x - 1 != -1 && x - 1 < ROWS && visited[x - 1][y] === false) {
    distance[x - 1][y] = distance[x][y] + 1;
    dir[x - 1][y] = "d";
    isSolvable = true;
  }
  if (x + 1 != 0 && x + 1 < ROWS && visited[x + 1][y] === false) {
    distance[x + 1][y] = distance[x][y] + 1;
    dir[x + 1][y] = "u";
    isSolvable = true;
  }
  if (y - 1 != -1 && y - 1 < COLS && visited[x][y - 1] === false) {
    distance[x][y - 1] = distance[x][y] + 1;
    dir[x][y - 1] = "l";
    isSolvable = true;
  }
  if (y + 1 != 0 && y + 1 < COLS && visited[x][y + 1] === false) {
    distance[x][y + 1] = distance[x][y] + 1;
    dir[x][y + 1] = "r";
    isSolvable = true;
  }
  visited[x][y] = true;
  if (!(x === startItem[0] && y === startItem[1])) {
    changeColour(x, y, "#A7BED3", "searched");
  }
  let minUnvisited = [-1, -1, Infinity];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (distance[i][j] < minUnvisited[2] && visited[i][j] === false) {
        minUnvisited = [i, j, distance[i][j]];
      }
    }
  }
  if (minUnvisited[0] === endItem[0] && minUnvisited[1] === endItem[1]) {
    console.log("solved");
    followPath(minUnvisited[0], minUnvisited[1]);
    isSolvable = true;
    return;
  } else {
    setTimeout(function () {
      dijkstras(minUnvisited[0], minUnvisited[1]);
    }, 1);
    // search(minUnvisited[0], minUnvisited[1]);
  }
}
