class Bird {
  constructor() {
    this.x = 100;
    this.y = height / 2 - 40;
    this.v = 0;
  }

  update() {
    this.v += gravity;
    this.y += this.v;
  }

  jump() {
    this.v = -7;
  }

  draw() {
    image(img, this.x, this.y, 50, 50);
  }
}
