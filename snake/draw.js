const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

var snake;
var fruit;
const timer = 150;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();

  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();
    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    document.querySelector(".score").innerText = snake.total;
    snake.checkCollition();
  }, timer);
})();

window.addEventListener("keydown", (evt) => {
  const direction = evt.key.replace("Arrow", "");
  snake.changeDirection(direction);
});
