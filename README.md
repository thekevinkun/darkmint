# DarkMint

🎓⛓️ An AI-powered Web3 certificate minter with a purple/pink cyberpunk aesthetic.
Generate custom certificates with AI, store them on IPFS, and mint them as NFTs on the blockchain.

<br >
<img width="148" height="148" alt="logo" src="https://github.com/user-attachments/assets/e430a180-8da0-4f36-a1fa-8c74f4466681" /><br ><br>
<img width="1200" height="630" alt="og-image" src="https://github.com/user-attachments/assets/02381b7e-0ba1-4baa-b787-78d033635061" />

---

## What It Does

1. User connects their MetaMask wallet
2. User fills out a form (name, certificate type, skills)
3. AI generates a custom certificate image + text (OpenAI GPT-4 + DALL-E 3)
4. Certificate is uploaded to IPFS (Pinata) for permanent decentralized storage
5. User mints the certificate as an NFT on the Sepolia testnet
6. The NFT lives in the user's wallet forever

---

## 🛠️ Tech Stack

| Technology      | Version | Purpose                                               |
| --------------- | ------- | ----------------------------------------------------- |
| **Next.js**     | 15.1+   | Framework (App Router, Server Actions)                |
| **React**       | 19.0+   | UI library (new hooks: useActionState, useFormStatus) |
| **TypeScript**  | 5.7+    | Type safety                                           |
| **Plain CSS**   | -       | Styling (structured, reusable, BEM naming)            |
| **Wagmi**       | 2.x     | Web3 React hooks                                      |
| **Viem**        | 2.x     | Ethereum library                                      |
| **RainbowKit**  | Latest  | Wallet connection UI                                  |
| **Hardhat**     | Latest  | Smart contract development                            |
| **Solidity**    | 0.8.28+ | Smart contract language                               |
| **OpenAI API**  | Latest  | AI image + text generation                            |
| **Pinata**      | Latest  | IPFS file storage                                     |
| **Alchemy**     | Latest  | Blockchain node provider                              |
| **Upstash**     | Latest  | Redis rate limiting                                   |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask wallet extension
- Accounts on: OpenAI, Pinata, Alchemy, Upstash

### Installation
```bash
git clone https://github.com/yourusername/darkmint.git
cd darkmint
npm install
```

### Environment Variables

Create a `.env.local` file in the root:
```bash
# OpenAI
OPENAI_API_KEY=sk-proj-...

# Pinata (IPFS)
PINATA_JWT=eyJhbGc...

# Alchemy — server-side only (NFT fetching, never exposed to browser)
ALCHEMY_API_KEY=...

# Alchemy — client-side (wagmi wallet connection)
NEXT_PUBLIC_ALCHEMY_API_KEY=...

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_ID=...

# Contract (already deployed to Sepolia)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x6341754c3Dc081973994591EEca6FB9469314ceF

# AI Mode: 'true' for real GPT-4 + DALL-E, 'false' for free mock
NEXT_PUBLIC_USE_REAL_AI=false

# App URL (used for OG meta tags)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Smart Contract

- **Contract:** DarkMint (ERC721)
- **Network:** Sepolia Testnet
- **Address:** `0x6341754c3Dc081973994591EEca6FB9469314ceF`
- **Etherscan:** [View Contract](https://sepolia.etherscan.io/address/0x6341754c3Dc081973994591EEca6FB9469314ceF)

### Key Functions
```solidity
// Mints a certificate NFT to a wallet address
function mintCertificate(address to, string memory uri) public returns (uint256)
```

---

## AI Modes

### Mock Mode (Free) — Default
```bash
NEXT_PUBLIC_USE_REAL_AI=false
```
- Uses template-based certificate text
- Uses placeholder image
- Free, unlimited generations
- Use this for development and testing

### Real AI Mode (~$0.10/generation)
```bash
NEXT_PUBLIC_USE_REAL_AI=true
```
- Uses GPT-4 for certificate text
- Uses DALL-E 3 for certificate image
- Use this for demos and screenshots

---

## Security

DarkMint implements several layers of security even as a learning project:

### Rate Limiting
API-intensive server actions are protected with IP-based rate limiting via Upstash Redis:
- **Certificate generation** — 3 requests per hour per IP (protects OpenAI costs)
- **IPFS upload** — 5 requests per hour per IP (protects Pinata storage)

### Wallet Verification
- Certificate generation requires a connected wallet
- The wallet address is validated server-side using viem's `isAddress` before any AI call is made
- Users without a connected wallet cannot access the generation form

### API Key Protection
- `ALCHEMY_API_KEY` is server-side only — used in a Server Action for NFT fetching, never exposed to the browser
- `OPENAI_API_KEY` and `PINATA_JWT` are server-side only — never accessible client-side
- `NEXT_PUBLIC_ALCHEMY_API_KEY` is scoped to wagmi wallet connection only, with domain allowlisting on the Alchemy dashboard

### Blockchain-Native Security
Web3 handles security concerns that would require manual implementation in Web2:
- **Ownership verification** — cannot fake owning an NFT; the blockchain is the source of truth
- **Transaction integrity** — every mint is cryptographically signed by the user's wallet
- **Immutability** — minted certificates cannot be altered or deleted by anyone

---

## Project Structure
```
darkmint/
├── app/
│   ├── page.tsx                      # Homepage
│   ├── layout.tsx                    # Root layout + metadata
│   ├── globals.css                   # CSS variables
│   ├── providers.tsx                 # Web3 providers
│   ├── my-nfts/
│   │   └── page.tsx                  # My Certificates page
│   ├── certificate/
│   │   └── [tokenId]/
│   │       ├── page.tsx              # Per-certificate page (OG tags)
│   │       └── not-found.tsx         # Custom 404 for missing tokens
│   └── actions/
│       ├── generate-certificate.ts   # AI generation server action
│       ├── upload-to-ipfs.ts         # IPFS upload server action
│       └── get-nfts.ts               # NFT fetching server action
├── components/
│   ├── CertificateForm.tsx           # Main form + session recovery
│   ├── MintButton.tsx                # NFT minting
│   ├── MyNFTs.tsx                    # View owned NFTs
│   ├── Header.tsx                    # Responsive navigation
│   ├── ShareButtons.tsx              # Social sharing (X, LinkedIn, copy)
│   └── Button.tsx                    # Reusable button component
├── contracts/
│   └── DarkMint.sol                  # ERC721 smart contract
├── lib/
│   ├── contract.ts                   # Contract address + ABI
│   ├── openai.ts                     # OpenAI client
│   ├── pinata.ts                     # Pinata client
│   ├── ratelimit.ts                  # Upstash rate limiter config
│   └── wagmi-config.ts               # Wagmi + RainbowKit config
├── public/
│   ├── og-image.png                  # Open Graph image (1200x630)
│   ├── logo.png                      # App logo
│   └── favicon.ico                   # Favicon + app icons
└── styles/                           # CSS architecture (BEM)
```

---

## Screenshot Landing Page

<img width="1840" height="4223" alt="localhost_3000_" src="https://github.com/user-attachments/assets/5324c6ea-c23b-4855-bedc-ad754f975f94" />

---

## Key Features

- **AI-Generated Certificates** — Every certificate is unique, generated by GPT-4 and DALL-E 3
- **Decentralized Storage** — Certificate images and metadata stored permanently on IPFS
- **True Ownership** — Minted as ERC721 NFTs, owned by the user's wallet forever
- **Per-Certificate Pages** — Every minted certificate has a shareable URL with Open Graph preview
- **Social Sharing** — Share to X (Twitter), LinkedIn, or copy link after minting
- **Session Recovery** — Unfinished mints are saved locally and restored automatically
- **Rate Limiting** — IP-based rate limiting protects OpenAI and Pinata from abuse
- **Wallet-Gated Generation** — Only connected wallets can generate certificates
- **Responsive Design** — Mobile-friendly with slide-in navigation drawer

---

## Learning Goals

This project was built to learn:

- React 19 new patterns (`useActionState`, `useFormStatus`, Server Actions)
- Next.js 15 App Router, Server Actions, and dynamic metadata
- Web3 development (smart contracts, wallet connection, blockchain interaction)
- AI integration (OpenAI API, prompt engineering)
- IPFS and decentralized storage (Pinata)
- Solidity and ERC721 NFT standard
- Security patterns (rate limiting, wallet verification, API key protection)
- TypeScript interfaces and proper typing

---

## License

MIT
