async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            alert(`Connected: ${accounts[0]}`);
        } catch (error) {
            alert("Connection failed.");
        }
    } else {
        alert("MetaMask not detected. Please install it.");
    }
}
