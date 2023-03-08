// Set the size of the grid
var resolution = 10;
// Calculate the number of rows and columns in the grid based on the size of the canvas
var rows, cols, grid, bndry, bbox;
function setup() {
  createCanvas(400, 400);
  rows = height / resolution;
  cols = width / resolution;
  frameRate(1);
  // Initialize the grid with random values
  grid = createRandomGrid();
  bndry = createRandomBoundaries();
  bbox = getBoundingBox(bndry);
  getStartingPoint(bbox, bndry, grid);
}
function getStartingPoint({ minX, minY, maxX, maxY }, bndry, grid) {
  let placed = false;
  let iStart = Math.floor(minX / resolution);
  let jStart = Math.floor(minX / resolution);
  let iEnd = Math.floor(minX / resolution);
  let jEnd = Math.floor(minX / resolution);
  for (var i = iStart; i < iEnd; i++) {
    for (var j = jStart; j < jEnd; j++) {
      if (
        checkBoundary(
          i * resolution,
          j * resolution,
          resolution,
          resolution,
          bndry
        )
      ) {
        console.log(i, j);
        return (grid[i][j] = 1);
      }
    }
  }
}
// Create a random grid with either a 0 or 1 at each position
function createRandomGrid() {
  var grid = new Array(cols);
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (var j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  // grid[0][0] = 1
  return grid;
}
function getBoundingBox(arr) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  arr.forEach((o) => {
    let { x, y, w, h } = o;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x + w > maxX) maxX = x + h;
    if (y + h > maxY) maxY = y + h;
  });
  return { minX, maxX, minY, maxY };
}
// Create a random grid with either a 0 or 1 at each position
function createRandomBoundaries() {
  let arr = [];
  let num = floor(random(10)) + 1;
  for (var i = 0; i < num; i++) {
    let o = {
      x: random(width - resolution) + resolution,
      y: random(height - resolution) + resolution,
      w: random(width / 10),
      h: random(height / 10),
    };
    arr.push(o);
  }
  return arr;
}
function draw() {
  // Draw the grid
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] == 1) {
        fill(0, 100);
      } else {
        fill(255);
      }
      stroke(0);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }
  fill("red");
  bndry.forEach((o) => {
    let { x, y, w, h } = o;
    rect(x, y, w, h);
  });
  // Create a new grid to hold the updated cell values
  var next = new Array(cols);
  for (var i = 0; i < cols; i++) {
    next[i] = new Array(rows); // creates a new array
  }
  // Calculate the new cell values
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // Count the number of live neighbors
      var neighbors = countNeighbors(grid, i, j);
      if (grid[i][j] == 0 && neighbors >= 1) {
        // check boundary
        if (
          checkBoundary(
            i * resolution,
            j * resolution,
            resolution,
            resolution,
            bndry
          )
        ) {
          next[i][j] = 1;
        }
      }
      if (grid[i][j] == 1) {
        next[i][j] = 1;
      }
    }
  }
  drawBBOX(bbox);
  // Set the new grid as the current grid
  grid = next;
}
function drawBBOX({ minX, maxX, minY, maxY }) {
  let w = maxX - minX;
  let h = maxY - minY;
  noFill();
  strokeWeight(5);
  stroke(0);
  rect(minX, minY, w, h);
  strokeWeight(1);
}
function checkBoundary(x, y, w, h, boundaries) {
  let pass = true;
  let verts = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
  boundaries.forEach((o) => {
    verts.forEach((v) => {
      if (v[0] > o.x && v[0] < o.x + o.w && v[1] > o.y && v[1] < o.y + o.h) {
        pass = false;
        return pass;
      }
    });
  });
  return pass;
}
// Count the number of live neighbors
function countNeighbors(grid, x, y) {
  var sum = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      var col = (x + i + cols) % cols;
      var row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
