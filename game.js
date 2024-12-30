// Game Variables
let bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;

// Start Game
function startGame() {
    alert("Game starting...");
    // Initialize game variables
    bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0 };
    pipes = [];
    score = 0;
    gameOver = false;

    createPipe();
    gameLoop();
}

// Create Pipes
function createPipe() {
    const gap = 120;
    const topHeight = Math.random() * (300 - gap) + 50;
    const bottomHeight = 480 - topHeight - gap;

    pipes.push({ x: 320, topHeight, bottomHeight });
}

// Update Game State
function updateGame() {
    if (gameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    pipes.forEach((pipe) => pipe.x -= 2);

    pipes = pipes.filter((pipe) => pipe.x > -50);

    if (bird.y < 0 || bird.y > 450) gameOver = true;
}

// Render the Game
function renderGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, 50, pipe.topHeight);
        ctx.fillRect(pipe.x, 450 - pipe.bottomHeight, 50, pipe.bottomHeight);
    });

    ctx.fillStyle = "#e7d610";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size / 2, 0, 2 * Math.PI);
    ctx.fill();
}

// Game Loop
function gameLoop() {
    updateGame();
    renderGame();
    if (!gameOver) requestAnimationFrame(gameLoop);
}
