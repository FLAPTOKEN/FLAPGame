async function connectWallet(walletType) {
    try {
        if (walletType === "metamask") {
            if (typeof window.ethereum !== "undefined") {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                alert(`Connected to MetaMask: ${accounts[0]}`);
            } else {
                alert("MetaMask not detected. Please install it.");
            }
        } else if (walletType === "trustwallet") {
            // Trust Wallet works similarly to MetaMask since it also uses Ethereum provider
            if (typeof window.ethereum !== "undefined") {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                alert(`Connected to Trust Wallet: ${accounts[0]}`);
            } else {
                alert("Trust Wallet not detected. Please install it.");
            }
        } else if (walletType === "coinbase") {
            // Coinbase Wallet detection and connection
            if (typeof window.ethereum !== "undefined") {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                alert(`Connected to Coinbase Wallet: ${accounts[0]}`);
            } else {
                alert("Coinbase Wallet not detected. Please install it.");
            }
        } else {
            alert("Unsupported wallet type.");
        }
    } catch (error) {
        alert(`Failed to connect: ${error.message}`);
    }
}

// Add event listeners for wallet buttons
document.getElementById("metamaskButton").addEventListener("click", () => connectWallet("metamask"));
document.getElementById("trustWalletButton").addEventListener("click", () => connectWallet("trustwallet"));
document.getElementById("coinbaseWalletButton").addEventListener("click", () => connectWallet("coinbase"));

// Back to Main Menu Button
document.getElementById("backToMenuButton").addEventListener("click", () => {
    document.getElementById("walletScreen").style.display = "none";
    document.getElementById("appContent").style.display = "block";
});
