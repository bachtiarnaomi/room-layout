// Set the size of the grid
var colors = ["#B5E1DC", "#F5E68B", "#C5C5E2", "#ECB7E4", "#DBFCAD", "#FFCF9F"];
var resolution = 10;
// Calculate the number of rows and columns in the grid based on the size of the canvas
var rows, cols, grid, bndry;
function setup() {
  createCanvas(400, 400);
  rows = height / resolution;
  cols = width / resolution;
  frameRate(1);
  // Initialize the grid with random values
  grid = createRandomGrid();
  bndry = createRandomBoundaries();
  bbox = getBoundingBox(bndry);
  console.log("bbox", bbox);
  getStartingPoint(bbox, bndry, grid);
}
function getStartingPoint({ minX, minY, maxX, maxY }, bndry, grid) {
  let placed = false;
  let iStart = Math.floor(minX / resolution);
  let jStart = Math.floor(minY / resolution);
  let iEnd = Math.floor(maxX / resolution);
  let jEnd = Math.floor(maxY / resolution);
  //   for (var i = iStart; i < iEnd; i++) {
  //     for (var j = jStart; j < jEnd; j++) {
  //       if (
  //         checkBoundary(
  //           i * resolution,
  //           j * resolution,
  //           resolution,
  //           resolution,
  //           bndry
  //         )
  //       ) {
  //         console.log(i, j);
  //         return (grid[i][j] = 1);
  //       }
  //     }
  //   }
  let maxIteration = 100;
  for (let i = 0; i < maxIteration; i++) {
    const i = getRandomInt(iStart, iEnd);
    const j = getRandomInt(jStart, jEnd);
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
// Create a random grid with either a 0 or 1 at each position
function createRandomGrid() {
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
    if (x + w > maxX) maxX = x + h;
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
function mousePressed() {
  console.log("mouse", mouseX, mouseY);
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
        fill("#FFCF9F");
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
    next[i] = new Array(rows).fill(0); // creates a new array
  }
  // Calculate the new cell values
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // Count the number of live neighbors
      var neighbors = countNeighbors(grid, i, j);
      if (grid[i][j] === 1 /*&& neighbors > 1*/) {
        fillNeighbours(grid, next, i, j, bbox);
      }
      if (grid[i][j] == 1 /*&& neighbors > 1*/) {
        next[i][j] = 1;
      }
    }
  }
  console.log("set next");
  // Set the new grid as the current grid
  drawBBOX(bbox);
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
// function draw() {
//   // Draw the grid
//   background(255);
//   for (var i = 0; i < cols; i++) {
//     for (var j = 0; j < rows; j++) {
//       if (grid[i][j] == 1) {
//         fill(0, 100);
//       } else {
//         fill(255);
//       }
//       stroke(0);
//       rect(i * resolution, j * resolution, resolution, resolution);
//     }
//   }
//   fill("red");
//   bndry.forEach((o) => {
//     let { x, y, w, h } = o;
//     rect(x, y, w, h);
//   });
//   // Create a new grid to hold the updated cell values
//   var next = new Array(cols);
//   for (var i = 0; i < cols; i++) {
//     next[i] = new Array(rows); // creates a new array
//   }
//   //   console.log("next", next);
//   // Calculate the new cell values
//   for (var i = 0; i < cols; i++) {
//     for (var j = 0; j < rows; j++) {
//       // Count the number of live neighbors
//       var neighbors = countNeighbors(grid, i, j);
//       if (grid[i][j] === 0 /*&& neighbors > 1*/) {
//         console.log("check boundary");
//         // check boundary
//         if (
//           checkBoundary(
//             i * resolution,
//             j * resolution,
//             resolution,
//             resolution,
//             bndry
//           )
//         ) {
//           next[i][j] = 1;
//         }
//       }
//       if (grid[i][j] == 1 /*&& neighbors > 1*/) {
//         next[i][j] = 1;
//       }
//     }
//   }
//   console.log("set next");
//   // Set the new grid as the current grid
//   grid = next;
// }

function fillNeighbours(grid, next, i, j, bbox) {
  if (j != rows && grid[i][j + 1] == 0) {
    if (
      checkBoundary(
        i * resolution,
        (j + 1) * resolution,
        resolution,
        resolution,
        bndry
      ) &&
      withinBBOX(bbox, i, j, resolution)
    ) {
      next[i][j + 1] = 1;
    }
  }
  if (j != 0 && grid[i][j - 1] == 0) {
    if (
      checkBoundary(
        i * resolution,
        (j - 1) * resolution,
        resolution,
        resolution,
        bndry
      ) &&
      withinBBOX(bbox, i, j, resolution)
    ) {
      next[i][j - 1] = 1;
    }
  }
  if (i != 0 && grid[i - 1][j] == 0) {
    if (
      checkBoundary(
        (i - 1) * resolution,
        j * resolution,
        resolution,
        resolution,
        bndry
      ) &&
      withinBBOX(bbox, i, j, resolution)
    ) {
      next[i - 1][j] = 1;
    }
  }
  if (i != grid.length - 1 && grid[i + 1][j] == 0) {
    if (
      checkBoundary(
        (i + 1) * resolution,
        j * resolution,
        resolution,
        resolution,
        bndry
      ) &&
      withinBBOX(bbox, i, j, resolution)
    ) {
      next[i + 1][j] = 1;
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
