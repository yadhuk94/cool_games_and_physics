let width = window.innerWidth;
let height = window.innerHeight;
let pause = false;
let bike;
let biker;
let rotateLeft = false;
let rotateRight = false;
let ground = [];
let gravity = 0.5;

function preload() {
  biker = loadImage("../images/biker.png");
}

function setup() {
  createCanvas(width, height);

  bike = new Bike();
  for (let i = 0; i < 8; i++) {
    ground.push(new Ground());
  }
}

function createGround() {
  ground.push(new Ground());
  if (ground.length === 11) {
    ground.shift();
  }
}

function draw() {
  background(150);
  // bike.update();
  bike.draw();
  if (bike.y > height / 2 + 25) bike.vy = 0;
  else bike.update();
  // if (frameCount % 88 === 0) {
  //   console.log(ground[0].x - width + width / 8);
  //   createGround();
  // }
  // for (let i = 0; i < ground.length; i++) {
  //   ground[i].draw();
  //   ground[i].update();
  // }
}

function keyPressed() {
  if (keyCode === 80) {
    pause ? loop() : noLoop();
    pause = !pause;
  }
  if (keyCode === 37) {
    bike.x -= 2;
  }
  if (keyCode === 38) {
    bike.vy = -10;
    bike.y = height / 2 + 25;
  }
  if (keyCode === 39) {
    bike.x += 2;
  }
  if (keyCode === 40) {
  }
}
