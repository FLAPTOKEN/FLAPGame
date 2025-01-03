let rewardGiven = false;
const BASE_REWARD = 10; // 10 Flap Tokens per point
const MINIMUM_PLAYTIME = 60 * 1000; // 60 seconds (1 minute)
let gameStartTime = Date.now();

// Function to calculate rewards
function calculateRewards(score) {
    const playDuration = Date.now() - gameStartTime;
    let rewardAmount = score * BASE_REWARD;

    if (playDuration < MINIMUM_PLAYTIME) {
        rewardAmount *= 0.5; // Reduce reward if played less than 1 minute
        alert("Playtime was too short! Reduced reward by 50%.");
    }

    return Math.floor(rewardAmount);
}

// Check and reward user
function checkScoreReward() {
    if (score >= 10 && !rewardGiven) {
        rewardGiven = true;
        const reward = calculateRewards(score);
        alert(`Congratulations! You've earned ${reward} Flap Tokens!`);
        sendFlapTokenReward(reward);
    }
}

// Token Transfer using Web3
async function sendFlapTokenReward(amount) {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const recipient = accounts[0]; // Player's wallet
            const tokenAddress = "YOUR_FLAP_TOKEN_CONTRACT_ADDRESS";

            const tx = {
                to: tokenAddress,
                from: recipient,
                value: "0",
                data: "0x" // Replace with the correct contract ABI interaction data
            };

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx]
            });

            alert(`${amount} Flap Tokens have been sent to your wallet!`);
        } catch (error) {
            alert("Error sending Flap Tokens: " + error.message);
        }
    } else {
        alert("Please connect your wallet.");
    }
}
