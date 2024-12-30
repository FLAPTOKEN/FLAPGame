// Telegram WebApp API Initialization
if (window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand(); // Ensure full-screen mode
}

// DOM Elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

// Resize Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth < 500 ? 300 : 320;
    canvas.height = window.innerWidth < 500 ? 450 : 480;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Load assets
const birdImage = new Image();
birdImage.src = "bird.png"; // Replace with a custom bird sprite
const backgroundImage = new Image();
backgroundImage.src = "background.png"; // Add a fancy background image
const pipeImage = new Image();
pipeImage.src = "pipe.png"; // Add a pipe sprite
const flapSound = new Audio("flap.mp3"); // Add a flap sound effect
const hitSound = new Audio("hit.mp3"); // Add a collision sound
const scoreSound = new Audio("score.mp3"); // Add a score sound

// Game Variables
let bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0, rotation: 0 };
let pipes = [];
let frameCount = 0;
let score = 0;
let gameOver = false;
const pipeWidth = 50;
const gap = 120;

// Start Game
startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    startGame();
});

// Tap to Jump on Mobile
canvas.addEventListener("click", () => {
    if (gameOver) {
        resetGame();
    } else {
        bird.velocity = bird.lift;
        flapSound.play();
    }
});

// Keyboard Controls
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !gameOver) {
        bird.velocity = bird.lift;
        flapSound.play();
    }
    if (e.code === "KeyR" && gameOver) resetGame();
});

// Start Game Logic
function startGame() {
    pipes = [];
    bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0, rotation: 0 };
    score = 0;
    gameOver = false;
    createPipe();
    gameLoop();
}

// Reset Game
function resetGame() {
    pipes = [];
    bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0, rotation: 0 };
    score = 0;
    gameOver = false;
    createPipe();
    gameLoop();
}

// Create Pipes
function createPipe() {
    const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
    const bottomHeight = canvas.height - topHeight - gap;
    pipes.push({ x: canvas.width, topHeight, bottomHeight });
}

// Update Game
function update() {
    if (gameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    bird.rotation = Math.min(Math.PI / 4, bird.velocity / 10);

    pipes.forEach((pipe) => (pipe.x -= 2));
    pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);

    if (frameCount % 120 === 0) createPipe();

    pipes.forEach((pipe) => {
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.size > pipe.x &&
            (bird.y < pipe.topHeight || bird.y + bird.size > canvas.height - pipe.bottomHeight)
        ) {
            gameOver = true;
            hitSound.play();
        }
    });

    if (bird.y + bird.size > canvas.height || bird.y < 0) {
        gameOver = true;
        hitSound.play();
    }

    pipes.forEach((pipe) => {
        if (!pipe.scored && bird.x > pipe.x + pipeWidth) {
            score++;
            pipe.scored = true;
            scoreSound.play();
        }
    });

    frameCount++;
}

// Draw Game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw pipes
    pipes.forEach((pipe) => {
        ctx.drawImage(pipeImage, pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.drawImage(pipeImage, pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
    });

    // Draw bird
    ctx.save();
    ctx.translate(bird.x + bird.size / 2, bird.y + bird.size / 2);
    ctx.rotate(bird.rotation);
    ctx.drawImage(birdImage, -bird.size / 2, -bird.size / 2, bird.size, bird.size);
    ctx.restore();

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);

    if (gameOver) {
        ctx.fillStyle = "#e7d610";
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "20px Arial";
        ctx.fillText("Tap to Restart", canvas.width / 2, canvas.height / 2 + 20);
    }
}

// Game Loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

// Initialize First Pipe
createPipe();
