function aStar(x, y) {
  seen[x][y] = true;
  let current = [-1, -1, Infinity]
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (distance[i][j] < current[2] && seen[i][j] === true) {
        current = [i, j, distance[i][j]];
      }
    }
  }

  if (x - 1 != -1 && x - 1 < ROWS && visited[x - 1][y] === false) {
    distance[x - 1][y] = distance[x][y] + 1;
    seen[x - 1][y] = true;
    dir[x - 1][y] = "d";
  }
  if (x + 1 != 0 && x + 1 < ROWS && visited[x + 1][y] === false) {
    distance[x + 1][y] = distance[x][y] + 1;
    seen[x + 1][y] = true;
    dir[x + 1][y] = "u";
  }
  if (y - 1 != -1 && y - 1 < COLS && visited[x][y - 1] === false) {
    distance[x][y - 1] = distance[x][y] + 1;
    seen[x][y - 1] = true;
    dir[x][y - 1] = "l";
  }
  if (y + 1 != 0 && y + 1 < COLS && visited[x][y + 1] === false) {
    distance[x][y + 1] = distance[x][y] + 1;
    seen[x][y + 1] = true;
    dir[x][y + 1] = "r";
  }
}
