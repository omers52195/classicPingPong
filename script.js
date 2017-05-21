var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 15;
var ballY = 50;
var ballSpeedY = 5;
var paddleOneY = 250;
const PADDLE_HEIGHT = 100;

function calcMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}

window.onload = function() {
  console.log('u wan sum suc?');
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d')

  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calcMousePosition(evt);
      paddleOneY = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

function ballReset(){
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX < 0) {
    if (ballY > paddleOneY &&
        ballY < paddleOneY + PADDLE_HEIGHT){
          ballSpeedX = -ballSpeedX;
        } else{
          ballReset();

        }
  }
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  // DRAWS CANVAS
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  // DRAWS LEFT PLAYER PADAL
  colorRect(0, paddleOneY, 5, PADDLE_HEIGHT, 'white');
  // DRAWS BALL
  colorCircle(ballX, ballY, 10, 'white')
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
