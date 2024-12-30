document.getElementById("scoreboardButton").addEventListener("click", () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("scoreboard").style.display = "block";

    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = ""; // Clear previous scores
    const scores = JSON.parse(localStorage.getItem("scores") || "[]");
    scores.forEach((score, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${score}`;
        scoreList.appendChild(li);
    });
});
