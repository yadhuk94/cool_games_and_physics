let bob;
let gravity = 0.6;

function setup() {
  createCanvas(1000, 700);
  bob = new Bob(450);
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    bob.dragging = true;
    bob.clicked(mouseX, mouseY);
  } else bob.dragging = false;
  bob.update();
  bob.show();
}
