const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let pipes = [];
let score = 0;
let birdY = 200;
let gameActive = false;

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

// Start the game
function startGame() {
    score = 0;
    birdY = 200;
    gameActive = true;
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

// Game over logic and scoring
function gameOver() {
    gameActive = false;
    alert(`Game Over! Your Score: ${score}`);
    score = 0;
}

function restartGame() {
    startGame();
}

canvas.addEventListener('click', jump);
