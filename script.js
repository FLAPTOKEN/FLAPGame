// Telegram WebApp API Initialization
if (window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
    const user = Telegram.WebApp.initDataUnsafe?.user || {};
    document.getElementById("user-avatar").src = user.photo_url || "default-avatar.png";
}

// Wallet Connection
document.getElementById("connect-wallet").addEventListener("click", async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            alert(`Connected Wallet: ${accounts[0]}`);
        } catch (error) {
            console.error("Wallet connection failed", error);
        }
    } else {
        alert("MetaMask is not installed.");
    }
});

// Menu Buttons
document.getElementById("play-game").addEventListener("click", () => {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gameCanvas").classList.remove("hidden");
    startGame();
});

document.getElementById("scoreboard").addEventListener("click", () => {
    alert("Scoreboard feature is under development!");
});

document.getElementById("settings").addEventListener("click", () => {
    document.getElementById("settings-modal").classList.remove("hidden");
});

document.getElementById("close-settings").addEventListener("click", () => {
    document.getElementById("settings-modal").classList.add("hidden");
});

// Game Logic
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = window.innerWidth < 500 ? 300 : 320;
    canvas.height = window.innerWidth < 500 ? 450 : 480;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Game Variables
let bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0 };
let pipes = [];
let frameCount = 0;
let score = 0;
let gameOver = false;
const pipeWidth = 50;
const gap = 120;

// Start Game
function startGame() {
    pipes = [];
    bird = { x: 50, y: 150, size: 24, gravity: 0.4, lift: -8, velocity: 0 };
    score = 0;
    gameOver = false;
    createPipe();
    gameLoop();
}

// Reset Game
function resetGame() {
    startGame();
}

// Game Loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

// Update Logic
function update() {
    if (gameOver) return;
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    pipes.forEach(pipe => (pipe.x -= 2));
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
    if (frameCount % 120 === 0) createPipe();
    pipes.forEach(pipe => {
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.size > pipe.x &&
            (bird.y < pipe.topHeight || bird.y + bird.size > canvas.height - pipe.bottomHeight)
        ) {
            gameOver = true;
        }
    });
    if (bird.y + bird.size > canvas.height || bird.y < 0) gameOver = true;
    frameCount++;
}

// Draw Logic
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e7d610";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size / 2, 0, 2 * Math.PI);
    ctx.fill();
    pipes.forEach(pipe => {
        ctx.fillStyle = "#000";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
    });
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);
}
function createPipe() {
    const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
    pipes.push({ x: canvas.width, topHeight, bottomHeight: canvas.height - topHeight - gap });
}
