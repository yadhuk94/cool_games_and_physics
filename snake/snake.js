function Snake() {
  this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
  this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  this.speedMul = 1;
  let mul = Math.floor(Math.random() * 2) ? 1 : -1;
  if (Math.floor(Math.random() * 2)) {
    this.xSpeed = scale * mul;
    this.ySpeed = 0;
  } else {
    this.xSpeed = 0;
    this.ySpeed = scale * mul;
  }

  this.total = 0;
  this.tail = [];

  this.draw = function () {
    ctx.fillStyle = "#333";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.y > canvas.height) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    }
  };

  this.changeDirection = function (direction) {
    switch (direction) {
      case "Up":
        this.xSpeed = 0;
        if (!(this.ySpeed > 0)) this.ySpeed = scale * -this.speedMul;
        break;
      case "Down":
        this.xSpeed = 0;
        if (!(this.ySpeed < 0)) this.ySpeed = scale * this.speedMul;
        break;
      case "Right":
        if (!(this.xSpeed < 0)) this.xSpeed = scale * this.speedMul;
        this.ySpeed = 0;
        break;
      case "Left":
        if (!(this.xSpeed > 0)) this.xSpeed = scale * -this.speedMul;
        this.ySpeed = 0;
        break;
      default:
        break;
    }
  };

  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.checkCollition = function () {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        alert(`Game Over! Your score is ${this.total}`);
        this.total = 0;
        this.tail = [];
        document.location.reload();
      }
    }
  };
}
