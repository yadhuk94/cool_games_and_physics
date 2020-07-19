class Planet {
  constructor(x, y, m, r, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.radius = r;
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    fill(this.red, this.green, this.blue);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }
}
