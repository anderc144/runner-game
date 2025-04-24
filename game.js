const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let character = new Image();
character.src = "character.png";

let x = 50;
let y = 150;
let yVelocity = 0;
let gravity = 0.8;
let jumpPower = -12;
let onGround = true;
let obstacles = [];
let score = 0;
let gameOver = false;

function drawCharacter() {
  ctx.drawImage(character, x, y - 48, 48, 48);
}

function drawObstacles() {
  ctx.fillStyle = "black";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
  });
}

function updateObstacles() {
  if (Math.random() < 0.02) {
    obstacles.push({ x: canvas.width, y: 160, w: 20, h: 40 });
  }
  obstacles.forEach(ob => ob.x -= 5);
  obstacles = obstacles.filter(ob => ob.x + ob.w > 0);
}

function checkCollision() {
  for (let ob of obstacles) {
    if (x + 48 > ob.x && x < ob.x + ob.w && y + 48 > ob.y) {
      gameOver = true;
    }
  }
}

function gameLoop() {
  if (gameOver) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over! Score: " + score, 250, 100);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCharacter();
  drawObstacles();
  updateObstacles();
  checkCollision();

  y += yVelocity;
  yVelocity += gravity;

  if (y > 150) {
    y = 150;
    yVelocity = 0;
    onGround = true;
  }

  score++;
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 20);

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" && onGround) {
    yVelocity = jumpPower;
    onGround = false;
  }
});

gameLoop();
