"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit"; // Pre-built connect button UI

// WalletConnect component
// RainbowKit's ConnectButton handles everything automatically:
// - Not connected → shows "Connect Wallet" button
// - Connected → shows wallet address + network + avatar
// - Wrong network → shows "Switch Network" warning
const WalletConnect = () => {
  return (
    <ConnectButton
      label="Connect Wallet" // Button text when not connected
      accountStatus="address" // Show wallet address when connected (not ENS name)
      chainStatus="icon" // Show network icon only (saves space in header)
      showBalance={false} // Hide ETH balance (keeps header clean)
    />
  );
};

export default WalletConnect;
