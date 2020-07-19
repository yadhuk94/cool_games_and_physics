class Bob {
  constructor(x, y, l, top) {
    this.length = l;
    this.stringStart = createVector(x, y);
    this.stringEnd = createVector(x, this.length);
    this.angle = 0;
    this.accStart = 0;
    this.accEnd = 0;
    this.velStart = 0;
    this.velEnd = 0;
    this.dragging = false;
    this.relGrv = 0;
    this.top = top;
  }

  update(pos) {
    this.stringStart = pos;
    if (top) {
      this.relGrv = 
    }
    if (!this.dragging) {
      this.accEnd = ((-1 * gravity) / this.length) * sin(this.angle);
      this.velEnd += this.accEnd;
      this.angle += this.velEnd;
      this.angle *= 0.999;
    }
    this.stringEnd.x = this.stringStart.x + this.length * sin(this.angle);
    this.stringEnd.y = this.stringStart.y + this.length * cos(this.angle);
  }

  clicked(xVal, yVal) {
    if (
      xVal > this.stringEnd.x - 50 &&
      xVal < this.stringEnd.x + 50 &&
      yVal > this.stringEnd.y - 50 &&
      yVal < this.stringEnd.y + 50
    ) {
      this.accEnd = 0;
      this.velEnd = 0;
      this.angle = atan(
        (xVal - this.stringStart.x) / (yVal - this.stringStart.y)
      );
    }
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
