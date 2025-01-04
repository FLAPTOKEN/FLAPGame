const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 480;

let birdImg = new Image();
birdImg.src = 'bird.png';  // Make sure to upload bird.png in the same folder
let backgroundImg = new Image();
backgroundImg.src = 'background.png';

let bird = { x: 50, y: 150, radius: 15 };
let gravity = 1.5;
let velocity = 0;
let pipes = [];
let score = 0;
let gameRunning = false;
let walletConnected = false;
let walletAddress = null;
const FLAP_TOKEN_ADDRESS = 'DCD79MMcSAfHgiTgfSCNNRstrVF2xcDxrb66Yetgpump';

// PIPE GENERATION
function generatePipe() {
    let gap = 100;
    let height = Math.floor(Math.random() * (canvas.height / 2));
    pipes.push({ x: canvas.width, y: height, gap: gap });
}

// GAME RESET FUNCTION
function resetGame() {
    bird.y = 150;
    velocity = 0;
    pipes = [];
    score = 0;
    generatePipe();
}

// GAME LOOP
function updateGame() {
    if (!gameRunning) return;

    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    velocity += gravity;
    bird.y += velocity;
    ctx.drawImage(birdImg, bird.x, bird.y, bird.radius * 2, bird.radius * 2);

    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x -= 2;

        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, 40, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipe.gap, 40, canvas.height - (pipe.y + pipe.gap));

        if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + 40 &&
            (bird.y - bird.radius < pipe.y || bird.y + bird.radius > pipe.y + pipe.gap)) {
            endGame();
        }

        if (pipe.x + 40 < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }

    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);

    if (pipes.length < 3) {
        generatePipe();
    }

    requestAnimationFrame(updateGame);
}

// START GAME
function startGame() {
    if (!walletConnected) {
        alert("Please connect your wallet first!");
        return;
    }
    document.getElementById('menu').style.display = 'none';
    gameRunning = true;
    resetGame();
    updateGame();
}

// END GAME
function endGame() {
    gameRunning = false;
    document.getElementById('game-over-screen').style.display = 'block';
    document.getElementById('final-score').textContent = score;
}

// RESTART GAME
function restartGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    startGame();
}

// WALLET CONNECTION USING PHANTOM
async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            walletConnected = true;
            walletAddress = response.publicKey.toString();
            alert("Wallet connected: " + walletAddress);
        } catch (err) {
            alert("Failed to connect wallet.");
        }
    } else {
        alert("Please install Phantom Wallet!");
    }
}

// REWARD CLAIM FUNCTION
async function claimFlapRewards() {
    if (!walletConnected) {
        alert("Connect your wallet first!");
        return;
    }

    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
    const tokenAddress = new solanaWeb3.PublicKey(FLAP_TOKEN_ADDRESS);
    const payer = window.solana;

    try {
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: walletAddress,
                toPubkey: tokenAddress,
                lamports: score * 100000  // Reward based on score
            })
        );

        const signature = await payer.signAndSendTransaction(transaction);
        alert(`Transaction successful! TxID: ${signature}`);
    } catch (error) {
        alert("Transaction failed: " + error.message);
    }
}
