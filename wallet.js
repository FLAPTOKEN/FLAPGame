import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} from '@solana/web3.js';

const connection = new Connection("https://api.devnet.solana.com");
const rewardAmount = 1000;

async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        await window.solana.connect();
        alert(`Wallet connected: ${window.solana.publicKey}`);
    } else {
        alert("Phantom wallet not detected!");
    }
}

async function rewardPlayer() {
    const wallet = window.solana.publicKey.toString();
    const recipient = new PublicKey(wallet);
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(wallet),
            toPubkey: recipient,
            lamports: rewardAmount * 1000, 
        })
    );
    try {
        await sendAndConfirmTransaction(connection, transaction, []);
        alert("Successfully rewarded FLAP tokens!");
    } catch (error) {
        console.error("Transaction failed!", error);
    }
}

document.getElementById("connectWalletButton").addEventListener("click", connectWallet);
document.getElementById("rewardButton").addEventListener("click", rewardPlayer);
