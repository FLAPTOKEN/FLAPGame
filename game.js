const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 480;

let bird = { x: 50, y: 150, radius: 15, velocity: 0 };
let pipes = [];
let score = 0;
let gameRunning = true;

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    });
}

function updatePipes() {
    if (gameRunning) {
        pipes.forEach(pipe => {
            pipe.x -= 2;
            if (pipe.x + pipe.width < 0) pipes.shift();
        });

        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width / 2) {
            let pipeHeight = Math.floor(Math.random() * 200 + 50);
            pipes.push({ x: canvas.width, y: 0, width: 50, height: pipeHeight });
            pipes.push({ x: canvas.width, y: pipeHeight + 100, width: 50, height: canvas.height - pipeHeight - 100 });
        }
    }
}

function updateGame() {
    bird.velocity += 0.5;
    bird.y += bird.velocity;

    updatePipes();

    if (bird.y > canvas.height || bird.y < 0) {
        alert("Game Over!");
        gameRunning = false;
    }

    pipes.forEach(pipe => {
        if (
            bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + pipe.width &&
            bird.y + bird.radius > pipe.y &&
            bird.y - bird.radius < pipe.y + pipe.height
        ) {
            alert("Game Over!");
            gameRunning = false;
        }
    });

    score++;
    document.getElementById("scoreDisplay").innerText = score;

    // Trigger reward if score reaches 10
    if (score >= 10) {
        document.getElementById("rewardButton").style.display = "block";
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    updateGame();
    if (gameRunning) requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', () => bird.velocity = -7);
canvas.addEventListener('click', () => bird.velocity = -7);

gameLoop();
