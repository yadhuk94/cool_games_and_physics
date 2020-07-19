let sun;
let earth;
let mars;
let venus;

function setup() {
  createCanvas(1000, 700);
  sun = new Planet(-150, 0, 10, 50, 0, 8);
  earth = new Planet(150, 0, 10, 50, 0, -8);
  mars = new Planet(0, 150, 10, 50, 8, 0);
  venus = new Planet(0, -150, 10, 50, -8, 0);
}

function gForce() {
  let r1 = p5.Vector.sub(earth.pos, sun.pos)
    .add(p5.Vector.sub(mars.pos, sun.pos))
    .add(p5.Vector.sub(venus.pos, sun.pos));
  let r2 = p5.Vector.sub(sun.pos, earth.pos)
    .add(p5.Vector.sub(mars.pos, earth.pos))
    .add(p5.Vector.sub(venus.pos, earth.pos));
  let r3 = p5.Vector.sub(sun.pos, mars.pos)
    .add(p5.Vector.sub(earth.pos, mars.pos))
    .add(p5.Vector.sub(venus.pos, mars.pos));
  let r4 = p5.Vector.sub(sun.pos, venus.pos)
    .add(p5.Vector.sub(mars.pos, venus.pos))
    .add(p5.Vector.sub(earth.pos, venus.pos));
  let g1 = (10 * sun.mass) / (r1.mag() * r1.mag());
  let g2 = (10 * earth.mass) / (r2.mag() * r2.mag());
  let g3 = (10 * mars.mass) / (r3.mag() * r3.mag());
  let g4 = (10 * venus.mass) / (r4.mag() * r4.mag());
  return [r1, r2, r3, r4, g1, g2, g3, g4];
}

function update(force) {
  sun.acc = force[0].mult(force[4]);
  earth.acc = force[1].mult(force[5]);
  mars.acc = force[2].mult(force[6]);
  venus.acc = force[3].mult(force[7]);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  update(gForce());
  sun.update();
  sun.show();
  earth.update();
  earth.show();
  venus.update();
  venus.show();
  mars.update();
  mars.show();
}
