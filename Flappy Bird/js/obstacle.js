class Obstacle {
  constructor() {
    this.x = width;
    this.h = random(height / 5, (3.5 * height) / 5);
    this.hit = false;
  }

  update() {
    this.x += vel;
    if (this.x === 700) createObstacle();
  }

  draw() {
    image(log, this.x, height - this.h, 50, this.h + 50);
    image(log, this.x, -50, 50, height - this.h - 100);
  }

  touch(b) {
    if (
      b.x > this.x &&
      b.x < this.x + 50 &&
      (b.y > height - this.h - 10 || b.y < height - this.h - 160)
    ) {
      this.hit = true;
    } else if (this.x + 50 === b.x) score++;
  }
}
