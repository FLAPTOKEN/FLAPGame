const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird;
let pipes = [];
let gameRunning = false;
let score = 0;

const GRAVITY = 0.6;
const PIPE_WIDTH = 50;
const PIPE_HEIGHT = 200;
const BIRD_SIZE = 30;
const GAP = 150;

const birdImg = new Image();
birdImg.src = 'bird.png';

const bgImg = new Image();
bgImg.src = 'background.png';

canvas.width = 400;
canvas.height = 600;

function startGame() {
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';
    document.getElementById('gameOverScreen').style.display = 'none';

    bird = {
        x: 50,
        y: canvas.height / 2,
        velocity: 0
    };

    pipes = [];
    score = 0;
    gameRunning = true;
    spawnPipe();
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Bird physics
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;
    ctx.drawImage(birdImg, bird.x, bird.y, BIRD_SIZE, BIRD_SIZE);

    // Collision detection
    if (bird.y + BIRD_SIZE > canvas.height || bird.y < 0) {
        gameOver();
    }

    // Pipes movement
    pipes.forEach((pipe, index) => {
        pipe.x -= 2;
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, PIPE_WIDTH, canvas.height - pipe.bottom);

        if (pipe.x + PIPE_WIDTH < 0) {
            pipes.splice(index, 1);
            score += 1;
        }

        if (
            bird.x < pipe.x + PIPE_WIDTH &&
            bird.x + BIRD_SIZE > pipe.x &&
            (bird.y < pipe.top || bird.y + BIRD_SIZE > pipe.bottom)
        ) {
            gameOver();
        }
    });

    // Add new pipes
    if (pipes.length < 3) {
        spawnPipe();
    }

    // Score Display
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

function spawnPipe() {
    const topHeight = Math.floor(Math.random() * (canvas.height / 3)) + 50;
    pipes.push({
        x: canvas.width,
        top: topHeight,
        bottom: topHeight + GAP
    });
}

function jump() {
    bird.velocity = -8;
}

function gameOver() {
    gameRunning = false;
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScore').innerText = score;
}

function restartGame() {
    startGame();
}

canvas.addEventListener('click', jump);
