let bird;
let gravity = 0.3;
let jumpForce = -1;
let obstacle = [];
let score = 0;
let pause = false;
let start = true;
let vel = -2;

let img;
let sky;
let log;

function preload() {
  img = loadImage("../images/birdImg.png");
  sky = loadImage("../images/sky.png");
  log = loadImage("../images/log.png");
}

function setup() {
  createCanvas(1000, 600);
  width = canvas.width;
  height = canvas.height;
  bird = new Bird();
  createObstacle();
  noLoop();
}

function reset() {
  obstacle = [];
  bird = new Bird();
  createObstacle();
  score = 0;
  vel = -2;
  pause = false;
  start = true;
  frameCount = 0;
  loop();
}

function createObstacle() {
  obstacle.push(new Obstacle());
}

function gameOver() {
  $("#game-over").show();
  $("#my-score").text(score);
  noLoop();
}

function draw() {
  image(sky, 0, 0, 1000, 600);
  bird.update();
  bird.draw();
  if (frameCount === 5) noLoop();
  if (obstacle.length !== 0) {
    for (let i = 0; i < obstacle.length; i++) {
      obstacle[i].update();
      obstacle[i].draw();
      obstacle[i].touch(bird);
      if (obstacle[i].hit) gameOver();
    }
  }
  if (obstacle.length > 4) {
    obstacle.shift();
  }
  if (bird.y > height + 20) gameOver();
  document.getElementById("score").textContent = score;
}

function keyPressed() {
  if (keyCode === 32) {
    bird.jump();
    if (start) {
      loop();
      start = !start;
    }
  }
  if (keyCode === 80) {
    pause ? loop() : noLoop();
    pause = !pause;
  }
}
