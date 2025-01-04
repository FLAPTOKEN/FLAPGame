let walletAddress = null;

// Connect to Phantom Wallet
let walletAddress = null;

async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        walletAddress = response.publicKey.toString();
        alert(`Wallet Connected: ${walletAddress}`);
    } else {
        alert("Please install Phantom Wallet!");
    }
}

// Ensure wallet is connected before playing
function checkWalletBeforeStart() {
    if (!walletAddress) {
        alert("Please connect your wallet first!");
        return;
    }
    startGame();
}


// Check Wallet Connection Before Claiming Rewards
async function claimRewards() {
    if (!walletAddress) {
        alert("⚠️ Please connect your wallet before claiming rewards!");
        return;
    }
    
    const rewardAmount = score * 100; // Reward logic based on score
    alert(`🎁 Claiming ${rewardAmount} FLAP Tokens!`);

    // Example: Smart contract interaction placeholder
    console.log(`Transferring ${rewardAmount} FLAP to: ${walletAddress}`);
}
