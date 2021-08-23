// hide the buttons level2 and level " at the begining of the game"

document.getElementById("level2").hidden = true;
document.getElementById("level3").hidden = true;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let score = 0;
let d;

const eat = new Audio();
const hitWall = new Audio();
const hitMe = new Audio();
eat.src = "../assets/sounds/eat.mp3";
hitWall.src = "../assets/sounds/hitWall.mp3";
hitMe.src = "../assets/sounds/hitMe.mp3";

const foodImg = new Image(20, 20);

//the image of the food
let foodImgFn = () => {
  foodImg.src = "../assets/img/snakeGame/food.png";
  foodImg.onload = () => {
    ctx.drawImage(foodImg, food.x, food.y);
  };
};
// call the function foodImg to creat the image of the food in the canvas
foodImgFn();

//descripe the intial position of the snake
let snake = [];
snake[0] = {
  x: 12 * box,
  y: 10 * box,
};
//create a random function to use it for food
let random_food = (min, max) => {
  return Math.round((Math.random() * (max - min) + min) / box) * box;
};

//give the food randome coordinates
let food = {
  x: random_food(0, canvas.width - box),
  y: random_food(0, canvas.height - box),
};

// draw the canvas
let draw = (level, newScore, game) => {
  console.log("Inside draw");
  //console.log("level=" + level);
  console.log(document.getElementById(level));
  console.log("d=" + d);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    var grd = ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "#cc0099");
    grd.addColorStop(1, "#ff66cc");
    ctx.fillStyle = grd;

    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "brown";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    document.getElementById("score").innerHTML = score;
    food = {
      x: random_food(0, canvas.width - box),
      y: random_food(0, canvas.height - box),
    };
  } else {
    snake.pop();
  }

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (score == newScore) {
    clearInterval(game);

    document.getElementById(level).hidden = false;
  }
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX > canvas.width - box ||
    snakeY > canvas.height - box ||
    collision(newHead, snake)
  ) {
    hitMe.play();
    clearInterval(game);
  }

  snake.unshift(newHead);
  ctx.drawImage(foodImg, food.x, food.y);
};

let game1 = setInterval(function () {
  draw("level2", 2, game1);
}, 200);

let Directions = () => {
  document.addEventListener("keydown", function (e) {
    if (e.keyCode == "37" && d != "RIGHT") {
      d = "LEFT";
      hitWall.play();
    } else if (e.keyCode == "38" && d != "DOWN") {
      d = "UP";
      hitWall.play();
    } else if (e.keyCode == "39" && d != "LEFT") {
      d = "RIGHT";
      hitWall.play();
    } else if (e.keyCode == "40" && d != "UP") {
      d = "DOWN";
      hitWall.play();
    }
  });
};

Directions();
let collision = (head, array) => {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
};

//level2
document.getElementById("level2").addEventListener("click", function () {
  // call the function foodImg to creat the image of the food in the canvas
  foodImgFn();

  //descripe the intial position of the snake
  let snake = [];
  snake[0] = {
    x: 16 * box,
    y: 10 * box,
  };

  let game2 = setInterval(function () {
    draw("level3", 4, game2);
  }, 120);
  Directions();

  collision();
});

//level 3
document.getElementById("level3").addEventListener("click", function () {
  let snake = [];
  snake[0] = {
    x: 16 * box,
    y: 10 * box,
  };

  let game3 = setInterval(function () {
    draw("", 100, game3);
  }, 70);

  Directions();

  collision();
});
document.getElementById("playAgain").addEventListener("click", function () {
  location.reload();
});
