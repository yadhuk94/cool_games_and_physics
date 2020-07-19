const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
let pause = true;
let changeLife = false;

// paddle
const width = 60;
const height = 10;
let life = 5;
let score = 0;
let paddle = {
  h: height,
  w: width,
  x: canvas.width / 2 - width / 2,
  y: canvas.height - height,
  speed: 4,
  dx: 0,
  dy: 0,
};

const paddleDefault = {
  h: height,
  w: width,
  x: canvas.width / 2 - width / 2,
  y: canvas.height - height,
  speed: 4,
  dx: 0,
  dy: 0,
};

let circle = {
  x: canvas.width / 2,
  y: 350,
  size: 10,
  dx: 0,
  dy: 4,
};

const circleDefault = {
  x: canvas.width / 2,
  y: 350,
  size: 10,
  dx: 0,
  dy: 4,
};

const brickWidth = 60;
const brickHeight = 15;
const brickPadding = 7;
const brickOffsetTop = 40;
const brickRowCount = 7;
const brickColumnCount = 7;
const totalBrickWidth =
  brickWidth * brickColumnCount + brickPadding * (brickColumnCount - 1);
const brickOffsetLeft = canvas.width / 2 - totalBrickWidth / 2;

const bricks = [];
for (c = 0; c < brickColumnCount; ++c) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; ++r) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = "purple";
  ctx.fill();
}

function drawPlayer() {
  ctx.fillStyle = "purple";
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function drawBricks() {
  for (c = 0; c < brickColumnCount; ++c) {
    for (r = 0; r < brickRowCount; ++r) {
      if (bricks[c][r].status == 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "18px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, canvas.width - 80, 25);
}

function drawLives() {
  ctx.font = "18px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Life: ${life}`, 10, 25);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPlayerPos() {
  paddle.x += paddle.dx;
  paddle.y += paddle.dy;

  detectWalls();
}

function newBallPos() {
  circle.x += circle.dx;
  circle.y += circle.dy;

  detectWalls();
  detectPlayer();
  detectBrick();
}

function detectWalls() {
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;
}

function detectPlayer() {
  if (
    circle.x < paddle.x + paddle.w &&
    circle.x > paddle.x - paddle.w &&
    circle.y + circle.size > paddle.y - paddle.h
  ) {
    circle.dy *= -1;
    circle.dx = (circle.x - paddle.x - 30) / 8;
  }
  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1;
  }

  if (circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  if (circle.y + circle.size > canvas.height) {
    life -= 1;
    circle = { ...circleDefault };
    paddle = { ...paddleDefault };
    changeLife = true;
    if (!life) {
      alert(`Game Over!!! Score: ${score}`);
      document.location.reload();
    }
  }
}

function detectBrick() {
  for (c = 0; c < brickColumnCount; ++c) {
    for (r = 0; r < brickRowCount; ++r) {
      const b = bricks[c][r];
      if (b.status == 1) {
        if (
          circle.x + circle.size >= b.x &&
          circle.x - circle.size <= b.x + brickWidth &&
          circle.y - circle.size <= b.y + brickHeight &&
          circle.y >= b.y
        ) {
          b.status = 0;
          circle.dy *= -1;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert(`Congrats! You completed the game!!! Score: ${score}`);
            document.location.reload();
          }
        }
      }
    }
  }
}

function update() {
  if (changeLife) {
    changeLife = false;
    pause = true;
  }
  clear();
  drawBricks();
  drawPlayer();
  drawCircle();
  drawScore();
  drawLives();
  newPlayerPos();
  newBallPos();
  if (pause) return;
  console.log(life);
  requestAnimationFrame(update);
}

function moveRight(e) {
  paddle.dx = paddle.speed;
}

function moveLeft(e) {
  paddle.dx = -paddle.speed;
}

function keyDown(e) {
  console.log(e.key);
  if (e.key === "ArrowRight" || e.key === "Right") {
    moveRight();
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    moveLeft();
  } else if (e.key === " ") {
    pause = !pause;
    if (!pause) update();
  }
}

function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
    paddle.dy = 0;
  }
}

update();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
