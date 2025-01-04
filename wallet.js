let walletAddress = null;

// Connect Phantom Wallet
async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            walletAddress = response.publicKey.toString();
            alert("Wallet connected: " + walletAddress);
        } catch (error) {
            alert("Wallet connection failed!");
        }
    } else {
        alert("Please install Phantom Wallet!");
    }
}

// Claim Rewards (Mock Function)
async function claimRewards() {
    if (!walletAddress) {
        alert("Connect your wallet first!");
        return;
    }
    const rewardAmount = score * 100; // Example calculation
    alert(`Claiming ${rewardAmount} FLAP Tokens!`);
    
    // Call smart contract here (Solana integration)
    console.log(`Transfer ${rewardAmount} FLAP to ${walletAddress}`);
}
