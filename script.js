const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 320;
canvas.height = 480;

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
birdImage.src = "bird.png"; // Add a "bird.png" image to your project folder

// Bird controls
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !gameOver) {
        bird.velocity = bird.lift;
    }
});

// Create pipes
function createPipe() {
    const topHeight = Math.random() * (canvas.height - gap - 50) + 20;
    const bottomHeight = canvas.height - topHeight - gap;
    pipes.push({ x: canvas.width, topHeight, bottomHeight });
}

// Update game objects
function update() {
    if (gameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Update pipes
    pipes.forEach((pipe) => {
        pipe.x -= 2; // Move pipes to the left
    });

    // Remove off-screen pipes
    pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);

    // Add new pipes
    if (frameCount % 150 === 0) {
        createPipe();
    }

    // Check collisions
    pipes.forEach((pipe) => {
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.size > pipe.x &&
            (bird.y < pipe.topHeight || bird.y + bird.size > canvas.height - pipe.bottomHeight)
        ) {
            gameOver = true;
        }
    });

    // Check if bird hits the ground or flies off the screen
    if (bird.y + bird.size > canvas.height || bird.y < 0) {
        gameOver = true;
    }

    // Increase score
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
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.drawImage(birdImage, bird.x, bird.y, bird.size, bird.size);

    // Draw pipes
    pipes.forEach((pipe) => {
        ctx.fillStyle = "#000";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight); // Top pipe
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight); // Bottom pipe
    });

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);

  // Draw game over message
if (gameOver) {
    ctx.fillStyle = "#e7d610";
    ctx.font = "30px Arial";
    ctx.textAlign = "center"; // Center-align text
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
}

}

// Main game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
createPipe();
gameLoop();
