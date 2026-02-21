// ============================================
// Hardhat Configuration
// Configures Solidity compiler and Sepolia network
// ============================================

import { HardhatUserConfig } from "hardhat/config"; // Hardhat types
import "@nomicfoundation/hardhat-toolbox"; // All Hardhat plugins
import * as dotenv from "dotenv"; // Load environment variables

dotenv.config({ path: ".env.local" }); // Load .env.local before anything else

const config: HardhatUserConfig = {
  solidity: "0.8.28", // Solidity compiler version

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, // Alchemy RPC
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Only add if exists
    },
  },
};

export default config;
