let walletAddress = null;

// Connect to Phantom Wallet
async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect({ onlyIfTrusted: true });
            walletAddress = response.publicKey.toString();
            alert("✅ Wallet Connected: " + walletAddress);
        } catch (error) {
            alert("❌ Wallet connection failed. Please try again!");
        }
    } else {
        alert("🛠️ Please install the Phantom Wallet extension first!");
    }
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
