// import { offsetEdges } from './layout.js';
// Set the size of the grid
var colors = ['#B5E1DC', '#F5E68B', '#C5C5E2', '#ECB7E4', '#DBFCAD', '#FFCF9F'];
var resolution = 10;
// Calculate the number of rows and columns in the grid based on the size of the canvas
var rows, cols, grid, boundary;
var bndry = [];
const state = {
  boundary: [],
  rooms,
  circulation: grid,
  spaces: [],
};

function setup() {
  createCanvas(400, 400);
  rows = height / resolution;
  cols = width / resolution;
  frameRate(100);
  // Initialize the grid with all zeroes
  grid = initGrid();
  boundary = createBoundary(300, 200, height, width);
  // bndry = createRandomBoundaries();
  // bndry = createRoomBoundaries();
  bbox = getBoundingBox(bndry);
  state.boundary = boundary;
  state.circulation = grid;
  // state.spaces = offsetEdges([0, 1, 2], state);
  // state.spaces = getRemainingSpace(state);

  // getStartingPoint(bbox, bndry, grid);
}

function createBoundary(w, h, canvasHeight, canvasWidth) {
  const boundary = {
    x: (canvasWidth - w) / 2,
    y: (canvasHeight - h) / 2,
    w,
    h,
  };
  console.log('the boundary', boundary);
  return boundary;
}
function getStartingPoint({ minX, minY, maxX, maxY }, bndry, grid) {
  let placed = false;
  let iStart = Math.floor(minX / resolution);
  let jStart = Math.floor(minY / resolution);
  let iEnd = Math.floor(maxX / resolution);
  let jEnd = Math.floor(maxY / resolution);
  let maxIteration = 500;
  for (let i = 0; i < maxIteration; i++) {
    const i = getRandomInt(iStart, iEnd);
    const j = getRandomInt(jStart, jEnd);
    if (
      checkBoundary(
        i * resolution,
        j * resolution,
        resolution,
        resolution,
        spaces,
        boundary
      )
    ) {
      console.log(i, j);
      return (grid[i][j] = 1);
    }
  }
}
// Create grid with all zeroes
function initGrid() {
  var grid = new Array(cols);
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (var j = 0; j < rows; j++) {
      grid[i][j] = 0; /*floor(random(2));*/
    }
  }
  //   grid[0][0] = 1;
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
    if (x + w > maxX) {
      maxX = x + w;
    }
    if (y + h > maxY) maxY = y + h;
  });
  return { minX, maxX, minY, maxY };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Create a random grid with either a 0 or 1 at each position
function createRandomBoundaries() {
  let arr = [];
  let num = floor(random(10));

  let o = {
    x: 5,
    y: 130,
    w: width / 3,
    h: 20,
  };
  arr.push(o);

  for (var i = 0; i < 2; i++) {
    let o = {
      x: Math.floor(width / 6) + random(width / 3),
      y: 100,
      w: 10,
      h: height / 2,
    };
    arr.push(o);
  }

  return arr;
}
function createRoomBoundaries() {
  let arr = [];
  let num = floor(random(10));

  let o = {
    x: 5,
    y: 100,
    w: 150,
    h: 50,
  };
  arr.push(o);

  let i = {
    x: 65,
    y: 250,
    w: 150,
    h: 50,
  };
  arr.push(i);

  return arr;
}
function mousePressed() {
  console.log('mouse', mouseX, mouseY);
  const row = Math.floor(mouseY / resolution);
  const col = Math.floor(mouseX / resolution);

  // get grid
  grid[col][row] = 1;
}
function draw() {
  // Draw the grid
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] == 1) {
        fill('#FFCF9F');
      } else {
        fill(255);
      }
      stroke(0);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }
  fill('red');
  bndry.forEach((o) => {
    let { x, y, w, h } = o;
    rect(x, y, w, h);
  });
  // Create a new grid to hold the updated cell values
  var next = new Array(cols);
  for (var i = 0; i < cols; i++) {
    next[i] = new Array(rows).fill(0); // creates a new array
  }
  // Calculate the new cell values
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // Count the number of live neighbors
      // var neighbors = countNeighborsN(grid, i, j, 3); // count 5 cells
      if (grid[i][j] === 1 /*&& neighbors > 1*/) {
        fillNeighbors(grid, next, i, j, bbox);
      }
      if (grid[i][j] == 1 /*&& neighbors > 1*/) {
        next[i][j] = 1;
      }
    }
  }
  drawBBOX(bbox);
  drawRect(boundary);

  drawSpaces(spaces);
  // Set the new grid as the current grid
  grid = next;
  state.grid = next;
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
function drawRect({ x, y, w, h }) {
  noFill();
  strokeWeight(5);
  stroke(0);
  rect(x, y, w, h);
  strokeWeight(1);
}

function fillNeighbors(grid, next, x, y, bbox, n = 1) {
  for (var i = -n; i < n + 1; i++) {
    for (var j = -n; j < n + 1; j++) {
      if (x + i < 0 || y + j < 0 || x + i > cols || y + j > rows) {
        continue;
      }
      var col = (x + i + cols) % cols;
      var row = (y + j + rows) % rows;
      var neighbors = countNeighborsN(grid, x, y, n);
      if (
        checkBoundary(
          col * resolution,
          row * resolution,
          resolution,
          resolution,
          bndry
        ) &&
        withinBBOX(bbox, col, row, resolution) &&
        neighbors < n * 4 + 2
      ) {
        next[col][row] = 1;
      }
    }
  }
}
function withinBBOX({ minX, minY, maxX, maxY }, i, j, resolution) {
  let iStart = Math.floor(minX / resolution);
  let jStart = Math.floor(minY / resolution);
  let iEnd = Math.floor(maxX / resolution);
  let jEnd = Math.floor(maxY / resolution);
  if (i > iStart && i < iEnd && j > jStart && j < jEnd) return true;
  return false;
}
function withinBoundary({ minX, minY, maxX, maxY }, i, j, resolution) {
  let iStart = Math.floor(minX / resolution);
  let jStart = Math.floor(minY / resolution);
  let iEnd = Math.floor(maxX / resolution);
  let jEnd = Math.floor(maxY / resolution);
  if (i > iStart && i < iEnd && j > jStart && j < jEnd) return true;
  return false;
}
function checkBoundary(x, y, w, h, spaces, boundary) {
  let pass = true;
  let verts = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
  spaces.forEach((o) => {
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
function countNeighborsN(grid, x, y, n) {
  var sum = 0;
  for (var i = -n; i < n + 1; i++) {
    for (var j = -n; j < n + 1; j++) {
      if (x + i < 0 || y + j < 0 || x + i > cols || y + j > rows) continue;
      var col = (x + i + cols) % cols;
      var row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

const spaces = [
  {
    x: 50,
    y: 100,
    w: 300,
    h: 40,
  },
  {
    x: 310,
    y: 100,
    w: 40,
    h: 200,
  },
];

function drawSpaces(spaces) {
  fill(255);
  spaces.forEach((space) => {
    const { x, y, w, h } = space;
    const points = [
      { x: x, y: y },
      { x: x + w, y: y },
      { x: x + w, y: y + h },
      { x: x, y: y + h },
    ];
    beginShape();
    points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape();
  });
}
