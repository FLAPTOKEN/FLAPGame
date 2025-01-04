import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    Keypair,
} from '@solana/web3.js';

const connection = new Connection("https://api.devnet.solana.com");
const programId = new PublicKey("DtZ7zA73JN27XwNiqWwFoZ4NBD8f8RhB6eLNs14LUAhZ");
const rewardAmount = 1000;

async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        await window.solana.connect();
        const wallet = window.solana.publicKey.toString();
        alert(`Connected wallet: ${wallet}`);
        return wallet;
    } else {
        alert("Please install Phantom Wallet!");
        return null;
    }
}

async function rewardPlayer() {
    const wallet = await connectWallet();
    if (!wallet) return;

    const recipient = new PublicKey(wallet);
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(wallet),
            toPubkey: recipient,
            lamports: rewardAmount * 1000, // 1000 FLAP tokens as a reward
        })
    );

    try {
        await sendAndConfirmTransaction(connection, transaction, []);
        alert("Successfully rewarded!");
    } catch (error) {
        console.error("Error:", error);
        alert("Transaction failed!");
    }
}

document.getElementById("rewardButton").addEventListener("click", rewardPlayer);
