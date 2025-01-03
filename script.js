// Ensure the app only works on mobile
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

window.onload = function () {
    const playOnMobileScreen = document.getElementById("playOnMobileScreen");
    const appContent = document.getElementById("appContent");

    if (!isMobileDevice()) {
        playOnMobileScreen.style.display = "block";
        appContent.style.display = "none";
    } else {
        playOnMobileScreen.style.display = "none";
        appContent.style.display = "block";
    }
};

// Prevent double-tap zoom
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
}, { passive: false });
