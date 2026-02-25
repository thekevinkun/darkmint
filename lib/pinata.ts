// ============================================
// Pinata Client Configuration
// Handles uploading files and JSON to IPFS
// ============================================

import { PinataSDK } from "pinata";

// Initialize Pinata client with JWT auth
// JWT contains all permissions in one token
export const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!, // Load JWT from .env.local
  pinataGateway: "beige-causal-meadowlark-885.mypinata.cloud", // Public gateway for viewing files
});
