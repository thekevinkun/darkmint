// ============================================
// DarkMint Contract Tests
// Tests our smart contract before deploying
// Run with: npx hardhat test
// ============================================

import { expect } from "chai"; // Assertion library
import { ethers } from "hardhat"; // Hardhat's ethers.js

describe("DarkMint", function () {
  // ============================================
  // Test 1: Contract Deploys Successfully
  // ============================================
  it("Should deploy with correct name and symbol", async function () {
    const DarkMint = await ethers.getContractFactory("DarkMint");
    const darkMint = await DarkMint.deploy();

    expect(await darkMint.name()).to.equal("DarkMint"); // Check collection name
    expect(await darkMint.symbol()).to.equal("DCERT"); // Check symbol
  });

  // ============================================
  // Test 2: Can Mint a Certificate
  // ============================================
  it("Should mint a certificate NFT", async function () {
    const DarkMint = await ethers.getContractFactory("DarkMint");
    const darkMint = await DarkMint.deploy();

    const [owner] = await ethers.getSigners(); // Get test wallet
    const testURI = "ipfs://QmTestHash123"; // Fake IPFS URI for testing

    // Mint a certificate
    const tx = await darkMint.mintCertificate(owner.address, testURI);
    await tx.wait(); // Wait for transaction

    // Check the NFT was minted correctly
    expect(await darkMint.ownerOf(0)).to.equal(owner.address); // Owner is correct
    expect(await darkMint.tokenURI(0)).to.equal(testURI); // URI is correct
  });

  // ============================================
  // Test 3: Token IDs Increment Correctly
  // ============================================
  it("Should increment token IDs correctly", async function () {
    const DarkMint = await ethers.getContractFactory("DarkMint");
    const darkMint = await DarkMint.deploy();

    const [owner] = await ethers.getSigners();

    // Mint two certificates
    await darkMint.mintCertificate(owner.address, "ipfs://hash1");
    await darkMint.mintCertificate(owner.address, "ipfs://hash2");

    // First NFT = ID 0, Second NFT = ID 1
    expect(await darkMint.ownerOf(0)).to.equal(owner.address);
    expect(await darkMint.ownerOf(1)).to.equal(owner.address);
  });
});
