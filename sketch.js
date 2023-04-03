// import { offsetEdges } from './layout.js';
// Set the size of the grid

var colors = ['#B5E1DC', '#F5E68B', '#C5C5E2', '#ECB7E4', '#DBFCAD', '#FFCF9F'];
var resolution = 10;
// Calculate the number of rows and columns in the grid based on the size of the canvas
var rows, cols, grid, boundary, zones;
var rooms = [];
var support = [];
const patient = { d: 50 };
var bndry = [];
const state = {
  boundary: [],
  rooms,
  circulation: grid,
  spaces: [],
};

function setup() {
  createCanvas(800, 800);
  rows = height / resolution;
  cols = width / resolution;
  frameRate(100);
  // Initialize the grid with all zeroes
  grid = initGrid();
  boundary = createBoundary(
    getRandomInt(100, 400),
    getRandomInt(100, 400),
    height,
    width
  );
  // boundary = assignRandomOverlap(boundary);
  rooms = createRooms(boundary, patient);
  support = createSupport(boundary, patient);
  console.log('support', support);

  // bndry = createRandomBoundaries();
  // bndry = createRoomBoundaries();
  bbox = getBoundingBox(bndry);
  state.boundary = boundary;
  state.circulation = grid;

  // state.spaces = offsetEdges([0, 1, 2], state);
  // state.spaces = getRemainingSpace(state);

  // getStartingPoint(bbox, bndry, grid);
}

function assignRandomOverlap(boundary) {
  console.log('boundary', boundary);
  boundary.overlap = { edge: [0, 1], length: [boundary.w / 3, boundary.h] };
  return boundary;
}

function createRooms(boundary, patient) {
  console.log('create rooms');
  const perimeterZones = getPerimeterZones(boundary, patient.d);
  const rooms = divideZones(perimeterZones, 50);
  return rooms;
}

function createSupport(boundary, { d }) {
  const { x, y, w, h } = boundary;
  if (w >= h) {
    const zone = {
      x: x + 30,
      y: y + d + 30,
      w: w - 2 * 30,
      h: h - 2 * (d + 30),
    };
    if (zone.w > 150) {
      const divided = divideZoneHorizontally(zone, 150, true, 30);
      return divided;
    }
  } else if (h > w) {
    const zone = {
      x: x + d + 30,
      y: y + 30,
      w: w - 2 * (d + 30),
      h: h - 2 * 30,
    };
    if (w < 0) {
      console.log('width too small', w);
      return [];
    }
    if (zone.h > 150) {
      const divided = divideZoneVertically(zone, 150, true, 30);
      return divided;
    }
  }
  return [];
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
      strokeWeight(1);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }

  // drawPatientZone(boundary, patient);
  // drawPatientRooms(boundary, patient);
  // drawSupportZone(boundary, patient);
  // drawCorridor(boundary, patient);
  // drawCrossCorridor(boundary, patient);
  drawRect(boundary);
  placeRooms(rooms);
  placeRooms(support);

  // drawSpaces(spaces);
  // Set the new grid as the current grid
}
function drawSupportZone({ x, y, w, h }, { d }) {
  fill('#C5C5E2');
  if (h > w) {
    rect(x + d, y, w - 2 * d, h);
  } else {
    rect(x, y + d, w, h - 2 * d);
  }
}
function drawCorridor({ x, y, w, h }, { d }) {
  strokeWeight(12);
  stroke(0);
  strokeCap(SQUARE);
  d += 1.5;
  if (h > w) {
    line(x + d, y, x + d, y + h);
    line(x + w - d, y, x + w - d, y + h);
    strokeWeight(8);
    stroke(255);
    line(x + d, y, x + d, y + h);
    line(x + w - d, y, x + w - d, y + h);
  } else {
    line(x, y + d, x + w, y + d);
    line(x, y + h - d, x + w, y + h - d);
    strokeWeight(8);
    stroke(255);
    line(x, y + d, x + w, y + d);
    line(x, y + h - d, x + w, y + h - d);
  }
}
function drawCrossCorridor({ x, y, w, h }, { d }) {
  const threshold = 120;
  strokeWeight(12);
  stroke(0);
  strokeCap(SQUARE);
  d += 5;
  if (h > w && h > threshold) {
    const n = Math.floor(h / threshold);
    const zoneWidth = h / n;
    for (let i = 0; i < n - 1; i++) {
      strokeWeight(12);
      stroke(0);
      line(x + d, y + zoneWidth * (i + 1), x + w - d, y + zoneWidth * (i + 1));
      strokeWeight(8);
      stroke(255);
      line(x + d, y + zoneWidth * (i + 1), x + w - d, y + zoneWidth * (i + 1));
    }
  } else {
    const n = Math.floor(w / threshold);
    const zoneWidth = w / n;
    for (let i = 0; i < n - 1; i++) {
      strokeWeight(12);
      stroke(0);
      line(x + zoneWidth * (i + 1), y + d, x + zoneWidth * (i + 1), y + h - d);
      strokeWeight(8);
      stroke(255);
      line(x + zoneWidth * (i + 1), y + d, x + zoneWidth * (i + 1), y + h - d);
      // line(x + d, y + threshold * (i + 1), x + w - d, y + threshold * (i + 1));
    }
  }
}
function drawPatientZone({ x, y, w, h }, { d }) {
  stroke(0);
  rect(x, y, w, h);

  fill('#A88AE8');
  if (h > w) {
    rect(x, y, d, h);
    rect(x + w - d, y, d, h);
  } else {
    rect(x, y, w, d);
    rect(x, y + h - d, w, d);
  }
}
function drawPatientRooms({ x, y, w, h }, { d }) {
  stroke('#333333');
  strokeWeight(3);
  rect(x, y, w, h);
  if (h > w) {
    rect(x, y, d, h);
    rect(x + w - d, y, d, h);
    const rect1 = { x: x, y: y, w: d, h: h };
    const rect2 = { x: x + w - d, y: y, w: d, h: h };
    let left = h;
    let currY = 0;
    while (left >= 50) {
      line(rect1.x, rect1.y + currY, rect1.x + rect1.w, rect1.y + currY);
      line(rect2.x, rect2.y + currY, rect2.x + rect2.w, rect2.y + currY);
      left -= 50;
      currY += 50;
    }
  } else {
    const rect1 = { x: x, y: y, w: w, h: d };
    const rect2 = { x: x, y: y + h - d, w: w, h: d };
    let left = w;
    let currX = 0;
    while (left >= 50) {
      line(rect1.x + currX, rect1.y, rect1.x + currX, rect1.y + rect1.h);
      line(rect2.x + currX, rect2.y, rect2.x + currX, rect2.y + rect2.h);
      left -= 50;
      currX += 50;
    }
  }
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

function placeRooms(rooms) {
  strokeWeight(4);
  stroke('purple');
  for (const room of rooms) {
    rect(room.x, room.y, room.w, room.h);
  }
  //p5.rect
}
function divideZoneByLine(zone, line) {
  if (line[0].x == line[1].x) {
    console.log('vertical line');
    if (zone.x < line[0].x && line[0].x < zone.x + zone.w) {
      if (zone.y >= line[0].y && zone.y + h <= line[1].y) {
        const zone1 = {
          x: zone.x,
          y: zone.y,
          w: line[0].x - zone.x,
          h: zone.h,
        };
        const zone2 = {
          x: line[0].x,
          y: y,
          w: zone.x + zone.w - line[0].x,
          h: zone.h,
        };
        return [zone1, zone2];
      }
    }
  } else if (line[0].y == line[1].y) {
    console.log('horizontal line');
    if (zone.y < line[0].y && line[0].y < zone.y + zone.h) {
      if (zone.x >= line[0].x && zone.x + h <= line[1].x) {
        const zone1 = {
          x: zone.x,
          y: zone.y,
          w: zone.w,
          h: line[0].y - zone.y,
        };
        const zone2 = {
          x: zone.x,
          y: line[0].y,
          w: zone.w,
          h: zone.y + zone.h - line[0].y,
        };
        return [zone1, zone2];
      }
    }
  }
  console.log('not cut');
  return [zone];
}

function getPerimeterZones(department, d) {
  console.log('dept', department);
  const { x, y, w, h } = department;
  if (w >= h) {
    const zone1 = { x, y, w, h: d };
    const zone2 = { x, y: y + h - d, w, h: d };
    return [zone1, zone2];
  }
  if (h > w) {
    const zone1 = { x, y, w: d, h };
    const zone2 = { x: x + w - d, y, w: d, h };
    return [zone1, zone2];
  }

  // find if any of the edges touch other departments.
  // find overlap.
}

function divideZones(zones, dist) {
  console.log('divide zones', zones);
  const rooms = [];
  for (const zone of zones) {
    const { x, y, w, h } = zone;
    if (w >= h) {
      rooms.push(...divideZoneHorizontally(zone, dist));
    }
    if (h > w) {
      rooms.push(...divideZoneVertically(zone, dist));
    }
  }
  return rooms;
}

function divideZoneHorizontally(zone, width, leftover = false, gap = 0) {
  console.log('divide horizontally', zone, gap);
  if (zone.h < 0) return [];
  const zones = [];
  const n = Math.floor(zone.w / width);
  let currX = zone.x;
  for (let i = 0; i < n; i++) {
    const o = { x: currX, y: zone.y, w: width, h: zone.h };
    if (i != 0 && i != n - 1) {
      o.x = o.x + gap / 2;
      o.w = o.w - gap / 2;
    }
    zones.push(o);
    currX += width;
  }
  if (leftover) {
    const left = zone.x + zone.w - currX;
    console.log('left', left);
    zones[zones.length - 1].w = zones[zones.length - 1].w + left;
  }
  return zones;
  // provide either dist or n
}
function divideZoneVertically(zone, height, leftover = false, gap = 0) {
  console.log('divide vertically', zone);
  if (zone.w < 0) return [];
  const zones = [];
  const n = Math.floor(zone.h / height);
  let currY = zone.y;
  for (let i = 0; i < n; i++) {
    const o = { x: zone.x, y: currY, w: zone.w, h: height };
    zones.push(o);
    currY += height;
    if (i != 0) {
      o.y = o.y + gap / 2;
      o.h = o.h - gap / 2;
    }
  }
  if (leftover) {
    const left = zone.y + zone.h - currY;
    console.log('left', left);
    zones[zones.length - 1].h = zones[zones.length - 1].h + left;
  }
  return zones;
}
