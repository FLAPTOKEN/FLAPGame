const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let bird, pipes, score, gameOver;

function initGame() {
    bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0 };
    pipes = [];
    score = 0;
    gameOver = false;
    createPipe();
    gameLoop();
}

function createPipe() {
    const gap = 120;
    const topHeight = Math.floor(Math.random() * (canvas.height - gap));
    pipes.push({
        x: canvas.width,
        topHeight,
        bottomHeight: canvas.height - topHeight - gap
    });
}

function updateGame() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    if (bird.y + bird.size > canvas.height || bird.y < 0) gameOver = true;

    pipes.forEach(pipe => {
        pipe.x -= 2;
        if (pipe.x + 50 < 0) pipes.shift();
        if (
            bird.x < pipe.x + 50 &&
            bird.x + bird.size > pipe.x &&
            (bird.y < pipe.topHeight || bird.y + bird.size > canvas.height - pipe.bottomHeight)
        ) {
            gameOver = true;
        }
    });

    if (pipes.length < 3) createPipe();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size / 2, 0, Math.PI * 2);
    ctx.fill();

    pipes.forEach(pipe => {
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, 50, pipe.topHeight);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, 50, pipe.bottomHeight);
    });

    ctx.fillStyle = "#FFF";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);
}

function gameLoop() {
    if (!gameOver) {
        updateGame();
        drawGame();
        requestAnimationFrame(gameLoop);
    } else {
        alert("Game Over! Tap to Restart");
        initGame();
    }
}

// Tap to Jump
canvas.addEventListener("click", () => {
    bird.velocity = bird.lift;
});
initGame();
