// ============================================
// IPFS Upload Server Action
// Uploads certificate image + metadata to IPFS
// ============================================
"use server";

import { pinata } from "@/lib/pinata"; // Pinata client

// Define what we return from this function
interface UploadResult {
  success: boolean;
  metadataUri?: string; // ipfs://Qm... for minting
  imageUri?: string; // ipfs://Qm... for the image itself
  error?: string;
}

export async function uploadToIPFS(
  imageUrl: string, // Temporary OpenAI/placeholder URL
  name: string, // Certificate recipient name
  certType: string, // Certificate type
  skills: string, // Skills list
): Promise<UploadResult> {
  try {
    // ============================================
    // STEP 1: Download real image from the URL, pass through placeholders
    // OpenAI URLs expire after 1 hour — save to IPFS now!
    // ============================================
    let imageUri: string;

    const isPlaceholder = imageUrl.includes("placehold.co");

    if (isPlaceholder) {
      // Mock mode — just use the URL directly, no download needed
      imageUri = imageUrl;
    } else {
      // Real AI mode — download from OpenAI and upload to IPFS (URLs expire!)
      console.log("📥 Downloading image from URL...");
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "certificate.png", {
        type: "image/png",
      });

      console.log("📤 Uploading image to IPFS...");
      const imageUpload = await pinata.upload.public.file(imageFile);
      imageUri = `ipfs://${imageUpload.cid}`;
      console.log("✅ Image uploaded:", imageUri);
    }
    // ============================================
    // STEP 3: Create NFT metadata JSON
    // This is the standard ERC721 metadata format
    // OpenSea, MetaMask, and all NFT platforms read this
    // ============================================
    const metadata = {
      name: `${certType} Certificate — ${name}`,
      description: `This certificate recognizes ${name} for their expertise in ${certType}. Skills: ${skills}`,
      image: imageUri, // Points to IPFS image (not a temp URL!)
      attributes: [
        { trait_type: "Certificate Type", value: certType },
        { trait_type: "Recipient", value: name },
        { trait_type: "Skills", value: skills },
        { trait_type: "Issued", value: new Date().toISOString().split("T")[0] },
        { trait_type: "Platform", value: "DarkMint" },
      ],
    };

    // ============================================
    // STEP 4: Upload metadata JSON to IPFS
    // ============================================
    console.log("📤 Uploading metadata to IPFS...");
    const metadataUpload = await pinata.upload.public.json(metadata);
    const metadataUri = `ipfs://${metadataUpload.cid}`; // This is what gets minted!
    console.log("✅ Metadata uploaded:", metadataUri);

    return {
      success: true,
      metadataUri, // Used in mintCertificate(address, metadataUri)
      imageUri, // Useful to display/verify
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ IPFS upload failed:", error);
    // Try to extract clean message from nested Pinata auth errors

    const rawMessage = err?.message || "";
    const match = rawMessage.match(/"message":"([^"]+)"/);
    const cleanMessage = match
      ? match[1]
      : rawMessage || "Failed to upload to IPFS. Please try again.";
    return {
      success: false,
      error: cleanMessage,
    };
  }
}
