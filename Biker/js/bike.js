class Bike {
  constructor() {
    this.vy = 0;
    this.w = 60;
    this.h = 50;
    this.x = width / 8;
    this.y = height / 2;
  }

  update() {
    this.vy += gravity;
    this.y += this.vy;
  }

  draw() {
    // push();
    // translate(width / 8, height / 2);
    if (keyIsDown(LEFT_ARROW)) {
      //   rotate(-PI / 10.0);
      this.x -= 3;
    } else if (keyIsDown(RIGHT_ARROW)) {
      //   rotate(PI / 10.0);
      this.x += 3;
    }

    image(biker, this.x, this.y, this.w, this.h);
    // pop();
  }
}
