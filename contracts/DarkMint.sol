// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// ============================================
// DarkMint Smart Contract
// An NFT certificate minter on the blockchain
// Each certificate is a unique NFT (ERC721 token)
// ============================================

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Base NFT standard
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Lets us store metadata URI
import "@openzeppelin/contracts/access/Ownable.sol"; // Owner-only functions

contract DarkMint is ERC721, ERC721URIStorage, Ownable {
  // Counter to track how many NFTs have been minted
  // Each NFT gets a unique ID (0, 1, 2, 3...)
  uint256 private _tokenIdCounter;

  // Event emitted when a certificate is minted
  // Frontend can listen for this to know when minting is done
  event CertificateMinted(address indexed to, uint256 indexed tokenId, string uri);

  // Constructor runs once when contract is deployed
  // Sets the NFT collection name and symbol
  constructor() ERC721("DarkMint", "DCERT") Ownable(msg.sender) {}

  // Mint Certificate Function
  // Creates a new NFT and assigns it to the user
  // Anyone can call this (public)
  function mintCertificate(
    address to,  // Wallet address that will receive the NFT
    string memory uri  // IPFS link to certificate metadata
  ) public returns (uint256) {

    uint256 tokenId = _tokenIdCounter; // Get current token ID
    _tokenIdCounter++; // Increment counter for next mint

    _safeMint(to, tokenId); // Create the NFT and send to user
    _setTokenURI(tokenId, uri); // Attach metadata URI to the NFT

    emit CertificateMinted(to, tokenId, uri); // Announce the mint

    return tokenId; // Return the new token's ID
  }

  // Required Overrides
  // Solidity requires these when using multiple
  // inherited contracts that have the same function
  function tokenURI(uint256 tokenId)
    public view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId); // Use ERC721URIStorage's version
  }

  function supportsInterface(bytes4 interfaceId)
    public view
    override(ERC721, ERC721URIStorage)
    returns (bool)
  {
    return super.supportsInterface(interfaceId); // Check interface support
  }
}