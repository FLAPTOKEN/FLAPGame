document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    startGame();
});

// Start game function
function startGame() {
    // Your game logic here
    console.log("Game started");
}
