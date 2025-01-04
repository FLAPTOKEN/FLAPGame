const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

// Load Assets
const birdImg = new Image();
birdImg.src = 'bird.png';

const bgImg = new Image();
bgImg.src = 'background.png';

const flapSound = new Audio('flap.mp3');
const gameOverSound = new Audio('gameover.mp3');

let bird, pipes, score, gameRunning;

// Initialize Game State
function initGame() {
    bird = { x: 50, y: canvas.height / 2, width: 40, height: 40, velocity: 0 };
    pipes = [];
    score = 0;
    gameRunning = true;
    document.getElementById("scoreDisplay").innerText = score;
    document.getElementById("rewardButton").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    spawnPipes();
    gameLoop();
}

// Draw Functions
function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    });
}

function drawBackground() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
}

// Update Game Mechanics
function updateGame() {
    bird.velocity += 0.5;
    bird.y += bird.velocity;

    pipes.forEach(pipe => {
        pipe.x -= 2;
        if (pipe.x + pipe.width < 0) pipes.shift();
    });

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width / 2) {
        spawnPipes();
    }

    score++;
    document.getElementById("scoreDisplay").innerText = score;

    // Collision Check
    if (bird.y + bird.height > canvas.height || bird.y < 0 || checkCollision()) {
        gameRunning = false;
        gameOverSound.play();
        document.getElementById("restartButton").style.display = "block";
    }

    if (score >= 10) {
        document.getElementById("rewardButton").style.display = "block";
    }
}

// Check for Collision
function checkCollision() {
    return pipes.some(pipe =>
        bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < pipe.y + pipe.height &&
        bird.y + bird.height > pipe.y
    );
}

// Pipe Management
function spawnPipes() {
    let height = Math.floor(Math.random() * canvas.height * 0.4) + 50;
    pipes.push({ x: canvas.width, y: 0, width: 50, height: height });
    pipes.push({ x: canvas.width, y: height + 150, width: 50, height: canvas.height - height - 150 });
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBird();
    drawPipes();
    updateGame();
    if (gameRunning) requestAnimationFrame(gameLoop);
}

// Event Listeners
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    initGame();
});

document.getElementById("restartButton").addEventListener("click", () => {
    initGame();
});

canvas.addEventListener('click', () => {
    bird.velocity = -7;
    flapSound.play();
});
