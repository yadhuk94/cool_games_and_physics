class Ground {
  constructor(y, start, index) {
    this.y = height / 2 + 25;
    this.start = start;
    // this.p1 = this.y;
    // this.p2 = this.y;
    // this.p3 = start ? this.y : random(height / 2 - 100, height / 2 + 100);
    // this.p4 = start ? this.y : random(height / 2 - 100, height / 2 + 100);
    this.rand = random([1, 2, 3]);
    this.h = random(5, 30);
    this.x = start ? 200 * index : width;
  }

  update() {
    this.x -= 2;
  }

  draw() {
    noFill();
    stroke(0);
    strokeWeight(10);
    if (this.rand === 1) {
      line(this.x, this.y, this.x + 200, this.y);
    } else if (this.rand === 2) {
      line(this.x, this.y, this.x + 50, this.y);
      line(this.x + 150, this.y, this.x + 200, this.y);
    } else if (this.rand === 3) {
      line(this.x, this.y, this.x + 50, this.y);
      rect(this.x + 50, this.y - this.h, 100, this.h);
      line(this.x + 150, this.y, this.x + 200, this.y);
    }

    // curve(
    //   this.x,
    //   this.p1,
    //   this.x + 25,
    //   this.p2,
    //   this.start ? this.x + 225 : this.x + 200,
    //   this.p3,
    //   this.x + 225,
    //   this.p4
    // );
  }
}
