const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth < 500 ? 300 : 320;
    canvas.height = window.innerWidth < 500 ? 450 : 480;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Detect device type
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Game variables
let bird = { x: 50, y: 150, size: 20, gravity: 0.5, lift: -10, velocity: 0 };
let pipes = [];
let frameCount = 0;
let score = 0;
let gameOver = false;

// Pipe settings
const pipeWidth = 50;
const gap = 100;

// Load images
const birdImage = new Image();
birdImage.src = "bird.png"; // Make sure you have this file

// Bird controls
if (isMobile) {
    // Touch controls for mobile
    canvas.addEventListener("touchstart", () => {
        if (!gameOver) bird.velocity = bird.lift;
        else resetGame(); // Restart game on touch if game is over
    });
} else {
    // Key controls for PC
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space" && !gameOver) bird.velocity = bird.lift;
        if (e.code === "KeyR" && gameOver) resetGame();
    });
}

function resetGame() {
    bird = { x: 50, y: 150, size: 20, gravity: 0.5, lift: -10, velocity: 0 };
    pipes = [];
    frameCount = 0;
    score = 0;
    gameOver = false;
    createPipe();
    gameLoop();
}

// Create pipes
function createPipe() {
    const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
    const bottomHeight = canvas.height - topHeight - gap;
    pipes.push({ x: canvas.width, topHeight, bottomHeight });
}

// Update game objects
function update() {
    if (gameOver) return;

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
        ) {
            gameOver = true;
        }
    });

    if (bird.y + bird.size > canvas.height || bird.y < 0) {
        gameOver = true;
    }

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
    ctx.fillText(`Score: ${score}`, 15, 30);

    if (gameOver) {
        ctx.fillStyle = "#e7d610";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
        ctx.font = "16px Arial";

        // Show restart instructions based on device type
        if (isMobile) {
            ctx.fillText("Tap to Restart", canvas.width / 2, canvas.height / 2 + 40);
        } else {
            ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 40);
        }
    }
}

// Main game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

// Start the game
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startButton").style.display = "none";
    createPipe();
    gameLoop();
});
