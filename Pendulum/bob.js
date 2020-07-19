class Bob {
  constructor(l) {
    this.length = l;
    this.stringStart = createVector(width / 2, 0);
    this.stringEnd = createVector(width / 2, this.length);
    this.angle = 0;
    this.acc = 0;
    this.vel = 0;
    this.dragging = false;
  }

  update() {
    if (!this.dragging) {
      this.acc = ((-1 * gravity) / this.length) * sin(this.angle);
      this.vel += this.acc;
      this.angle += this.vel;
      this.angle *= 0.999;
    }
    this.stringEnd.x = this.stringStart.x + this.length * sin(this.angle);
    this.stringEnd.y = this.stringStart.y + this.length * cos(this.angle);
  }

  clicked(xVal, yVal) {
    this.acc = 0;
    this.vel = 0;
    this.angle = atan((xVal - width / 2) / yVal);
  }

  show() {
    stroke(255);
    line(
      this.stringStart.x,
      this.stringStart.y,
      this.stringEnd.x,
      this.stringEnd.y
    );
    fill(255, 0, 0);
    ellipse(this.stringEnd.x, this.stringEnd.y, 50, 50);
  }
}
