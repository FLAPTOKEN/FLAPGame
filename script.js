const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Responsive canvas dimensions
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 20, 400); // Max width: 400px
    canvas.height = Math.min(window.innerHeight - 150, 600); // Max height: 600px
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Game variables
let bird = { x: 50, y: 150, size: 20, gravity: 0.5, lift: -10, velocity: 0 };
let pipes = [];
let frameCount = 0;
let score = 0;
let gameOver = false;
let gameStarted = false;

// Pipe settings
const pipeWidth = 50;
const gap = 150;

// Bird image
const birdImage = new Image();
birdImage.src = "bird.png";

// Start game logic
document.getElementById("startButton").addEventListener("click", () => {
    gameStarted = true;
    document.getElementById("startButton").style.display = "none";
    createPipe();
    gameLoop();
});

// Touch controls for mobile
canvas.addEventListener("touchstart", () => {
    if (!gameStarted) return;
    if (!gameOver) bird.velocity = bird.lift; // Flap
});

// Keyboard controls for desktop
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !gameOver && gameStarted) {
        bird.velocity = bird.lift; // Flap
    }
    if (e.code === "KeyR" && gameOver) {
        resetGame();
    }
});

// Reset game logic
function resetGame() {
    bird = { x: 50, y: 150, size: 20, gravity: 0.5, lift: -10, velocity: 0 };
    pipes = [];
    score = 0;
    frameCount = 0;
    gameOver = false;
    createPipe();
    gameLoop();
}

// Create pipes
function createPipe() {
    const topHeight = Math.random() * (canvas.height - gap - 50) + 50;
    const bottomHeight = canvas.height - topHeight - gap;
    pipes.push({ x: canvas.width, topHeight, bottomHeight });
}

// Update game objects
function update() {
    if (gameOver || !gameStarted) return;

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

    ctx.drawImage(birdImage, bird.x, bird.y, bird.size, bird.size);

    pipes.forEach((pipe) => {
        ctx.fillStyle = "#000";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
    });

    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);

    if (gameOver) {
        ctx.fillStyle = "#e7d610";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
        ctx.font = "16px Arial";
        ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 40);
    }
}

// Main game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}
