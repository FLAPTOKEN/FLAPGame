document.getElementById("walletButton").addEventListener("click", async () => {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const walletAddress = accounts[0];
            alert(`Connected Wallet: ${walletAddress}`);
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("MetaMask not detected. Please install it.");
    }
});
