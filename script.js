const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions dynamically
function resizeCanvas() {
    const width = Math.min(window.innerWidth, 400);
    const height = Math.min(window.innerHeight, 600);
    canvas.width = width - 20; // Add margin
    canvas.height = height - 20;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Initialize game variables
let bird = { x: 50, y: 150, size: 20, gravity: 0.5, lift: -10, velocity: 0 };
let pipes = [];
let frameCount = 0;
let score = 0;
let gameOver = false;
let gameStarted = false; // New variable to delay gravity until the game starts

// Pipe settings
const pipeWidth = 50;
const gap = 150;

// Bird image
const birdImage = new Image();
birdImage.src = "bird.png"; // Ensure the "bird.png" file exists in your project

// Bird controls for desktop
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && gameStarted && !gameOver) {
        bird.velocity = bird.lift; // Flap
    } else if (e.code === "KeyR" && gameOver) {
        resetGame(); // Restart the game
    }
});

// Touch controls for mobile
canvas.addEventListener("touchstart", () => {
    if (gameStarted && !gameOver) {
        bird.velocity = bird.lift; // Flap
    }
});

// Reset game
function resetGame() {
    bird = { x: 50, y: 150, size: 20, gravity: 0.5, lift: -10, velocity: 0 };
    pipes = [];
    frameCount = 0;
    score = 0;
    gameOver = false;
    gameStarted = false;
    createPipe();
    drawInitialScreen(); // Show the start screen again
}

// Create pipes
function createPipe() {
    const topHeight = Math.random() * (canvas.height - gap - 50) + 50;
    const bottomHeight = canvas.height - topHeight - gap;
    pipes.push({ x: canvas.width, topHeight, bottomHeight });
}

// Update game state
function update() {
    if (!gameStarted || gameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    pipes.forEach((pipe) => (pipe.x -= 2));
    pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);

    if (frameCount % 150 === 0) createPipe();

    pipes.forEach((pipe) => {
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.size > pipe.x &&
            (bird.y < pipe.topHeight || bird.y + bird.size > canvas.height - pipe.bottomHeight)
        ) gameOver = true;
    });

    if (bird.y + bird.size > canvas.height || bird.y < 0) gameOver = true;

    pipes.forEach((pipe) => {
        if (!pipe.scored && bird.x > pipe.x + pipeWidth) {
            score++;
            pipe.scored = true;
        }
    });

    frameCount++;
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.drawImage(birdImage, bird.x, bird.y, bird.size, bird.size);

    // Draw pipes
    pipes.forEach((pipe) => {
        ctx.fillStyle = "#000";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
    });

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 15, 30);

    if (gameOver) {
        ctx.fillStyle = "#e7d610";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
        ctx.font = "16px Arial";
        ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 40);
    }
}

// Initial start screen
function drawInitialScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e7d610";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Tap to Start", canvas.width / 2, canvas.height / 2);
}

// Game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

// Start the game
function startGame() {
    gameStarted = true;
    document.getElementById("startButton").style.display = "none";
    createPipe();
    gameLoop();
}

// Add event listener to the start button
document.getElementById("startButton").addEventListener("click", startGame);

// Draw the initial screen
drawInitialScreen();
