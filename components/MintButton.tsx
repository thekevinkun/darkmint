"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { Button } from "@/components";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

interface MintButtonProps {
  metadataUri: string; // The ipfs://Qm...
  onMintSuccess: (hash: string, tokenId: number) => void; // Callback to pass tx hash back to parent
}

// MintButton Component
// Calls the smart contract to mint the NFT
// Uses Wagmi hooks to interact with blockchain
const MintButton = ({ metadataUri, onMintSuccess }: MintButtonProps) => {
  // Get the connected wallet address
  const { address, isConnected } = useAccount();

  // useWriteContract — sends a transaction to the blockchain
  // data = the transaction hash once submitted
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  // useWaitForTransactionReceipt — waits for the tx to be confirmed
  // isConfirming = tx submitted but not yet mined
  // isSuccess = tx mined and confirmed!
  const {
    isLoading: isConfirming,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash, // Watch this specific transaction
  });

  const handleMint = () => {
    if (!address) return;

    // Call mintCertificate(address, uri) on our deployed contract
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "mintCertificate",
      args: [address, metadataUri], // to = user's wallet, uri = IPFS metadata
    });
  };

  // Notify parent when mint is confirmed
  useEffect(() => {
    if (isSuccess && hash && receipt) {
      // The CertificateMinted event is the first log emitted by our contract
      // tokenId is the second topic (index 1) in the log — it's hex encoded
      const log = receipt.logs[0];
      const tokenId = log ? Number(BigInt(log.topics[2] ?? "")) : 0;
      onMintSuccess(hash, tokenId);
    }
  }, [isSuccess, hash, receipt]);

  // Wallet not connected
  if (!isConnected) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "var(--text-tertiary)",
          fontSize: "0.875rem",
        }}
      >
        🔌 Connect your wallet to mint this certificate as an NFT
      </p>
    );
  }

  // Screen reader status message
  const statusMessage = isPending
    ? "Waiting for MetaMask confirmation"
    : isConfirming
    ? "Minting your certificate, please wait"
    : isSuccess
    ? "Certificate minted successfully!"
    : "";

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      {/* Mint button */}
      <Button
        onClick={handleMint}
        disabled={isPending || isConfirming || isSuccess}
        loading={isPending || isConfirming}
        loadingText={isPending ? "⏳ Confirm in MetaMask..." : "⛏️ Minting..."}
        className="w-full"
      >
        {isSuccess ? "✅ Minted!" : "🪙 Mint as NFT"}
      </Button>

      {/* Transaction submitted — show hash */}
      {isConfirming && (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.75rem",
            color: "#a855f7",
          }}
        >
          Waiting for blockchain confirmation...
        </p>
      )}

      {/* Error */}
      {error && (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.75rem",
            color: "#f87171",
          }}
        >
          ❌ {error.message.split("\n")[0]}
        </p>
      )}

      {/* SUCCESS! */}
      {isSuccess && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#00ff88", fontWeight: 600, fontSize: "1rem" }}>
            NFT Minted Successfully!
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              marginTop: "0.5rem",
            }}
          >
            Your certificate lives on the blockchain forever.
          </p>
          <Link
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "0.75rem", color: "#ff00ff" }}
          >
            View transaction on Etherscan ↗
          </Link>
        </div>
      )}

      {/* Screen reader only status announcer */}
      {statusMessage && (
        <p
          role="status"
          aria-live="polite"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
          }}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default MintButton;
