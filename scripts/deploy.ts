// ============================================
// Deployment Script
// Deploys DarkMint contract to Sepolia testnet
// Run with: npx hardhat run scripts/deploy.ts --network sepolia
// ============================================

import { ethers } from "hardhat"; // Hardhat's ethers.js library
import * as dotenv from "dotenv"; // Load environment variables

dotenv.config({ path: ".env.local" }); // Load from .env.local (not .env)

async function main() {
  console.log("🚀 Deploying DarkMint contract to Sepolia...");

  // Get the deployer wallet (uses PRIVATE_KEY from .env.local)
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with wallet:", deployer.address);

  // Check deployer balance before deploying
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Wallet balance:", ethers.formatEther(balance), "ETH");

  // Get the contract factory (blueprint for deploying)
  const DarkMint = await ethers.getContractFactory("DarkMint");

  // Deploy the contract (this costs gas!)
  console.log("⏳ Deploying... (this takes 15-30 seconds)");
  const darkMint = await DarkMint.deploy();

  // Wait for deployment to be confirmed on blockchain
  await darkMint.waitForDeployment();

  // Get the deployed contract address
  const contractAddress = await darkMint.getAddress();

  console.log("✅ DarkMint deployed successfully!");
  console.log("📋 Contract address:", contractAddress);
  console.log("🔍 View on Etherscan:");
  console.log(`   https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("");
  console.log("⚠️  IMPORTANT: Save this contract address!");
  console.log("   Add it to your .env.local as:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
}

// Run the deployment
main()
  .then(() => process.exit(0)) // Exit cleanly on success
  .catch((error) => {
    console.error("❌ Deployment failed:", error); // Log error
    process.exit(1); // Exit with error code
  });
