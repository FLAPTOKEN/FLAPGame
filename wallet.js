let walletAddress = null;

// Connect to Phantom Wallet
async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            alert(`Wallet Connected: ${response.publicKey.toString()}`);
            userWallet = response.publicKey.toString();
        } catch (err) {
            alert('Wallet connection failed!');
        }
    } else {
        alert('Please install Phantom Wallet!');
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
