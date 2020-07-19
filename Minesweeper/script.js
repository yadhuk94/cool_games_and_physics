function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 40;
var totalBees = 15;
var c;
var fCount = totalBees;

function setup() {
  createCanvas(800, 400);
  cols = floor(width / 2 / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick totalBees spots

  var options = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];

    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      temp = grid[i][j].countBees();
    }
  }
}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

window.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && mouseButton === LEFT) {
        grid[i][j].reveal();

        if (grid[i][j].bee) gameOver();
      }
      if (mouseButton === RIGHT && grid[i][j].contains(mouseX, mouseY))
        grid[i][j].createFlag();
    }
  }
  c = 0;
  fCount = totalBees;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].revealed) c++;
      if (grid[i][j].flag) fCount--;
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  stroke(0);
  textAlign(LEFT);
  fill(0);
  text(`Mines left: ${fCount}`, 420, 15);
  if (c === cols * rows - totalBees) {
    text(`Congrats! You completed the game`, 220, 30);
  }
}
