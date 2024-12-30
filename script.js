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
    document.getElementById("appContent").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
});

document.getElementById("scoreboardButton").addEventListener("click", () => {
    document.getElementById("appContent").style.display = "none";
    document.getElementById("scoreboardScreen").style.display = "block";
});

document.getElementById("settingsButton").addEventListener("click", () => {
    document.getElementById("appContent").style.display = "none";
    document.getElementById("settingsScreen").style.display = "block";
});

document.getElementById("connectWalletButton").addEventListener("click", () => {
    document.getElementById("appContent").style.display = "none";
    document.getElementById("walletScreen").style.display = "block";
});

    startGame(); // Start the game logic from game.js
});

document.getElementById("scoreboardButton").addEventListener("click", () => {
    showScoreboard();
});

document.getElementById("settingsButton").addEventListener("click", () => {
    alert("Settings will be implemented soon!");
});

document.getElementById("walletButton").addEventListener("click", () => {
    document.getElementById("appContent").classList.add("hidden");
    document.getElementById("walletScreen").classList.remove("hidden");
});

document.getElementById("backButtonWallet").addEventListener("click", () => {
    document.getElementById("walletScreen").classList.add("hidden");
    document.getElementById("appContent").classList.remove("hidden");
});

