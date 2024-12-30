// Detect if the user is on mobile or PC
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Show the appropriate screen based on the device
window.onload = function () {
    const playOnMobileScreen = document.getElementById("playOnMobileScreen");
    const appContent = document.getElementById("appContent");

    if (!isMobileDevice()) {
        // If on PC, show the "Play on Mobile" screen
        playOnMobileScreen.style.display = "block";
        appContent.style.display = "none";
    } else {
        // If on mobile, show the app content
        playOnMobileScreen.style.display = "none";
        appContent.style.display = "block";
    }
};

// Button Click Handlers
document.getElementById("playGameButton").addEventListener("click", () => {
    console.log("Play Game clicked!");
    startGame(); // Calls the startGame() function in game.js
});

document.getElementById("scoreboardButton").addEventListener("click", () => {
    console.log("Scoreboard clicked!");
    showScoreboard();
});

document.getElementById("settingsButton").addEventListener("click", () => {
    console.log("Settings clicked!");
    openSettings();
});

document.getElementById("connectWalletButton").addEventListener("click", () => {
    console.log("Connect Wallet clicked!");
    connectWallet();
});
