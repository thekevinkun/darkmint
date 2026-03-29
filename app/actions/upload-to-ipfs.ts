// ============================================
// IPFS Upload Server Action
// Uploads certificate image + metadata to IPFS
// ============================================
"use server";

import { headers } from "next/headers";
import { pinata } from "@/lib/pinata";
import { uploadRatelimit } from "@/lib/ratelimit";

// Define what we return from this function
interface UploadResult {
  success: boolean;
  metadataUri?: string; // ipfs://Qm... for minting
  imageUri?: string; // ipfs://Qm... for the image itself
  error?: string;
}

// Turn certificate details into a safe filename for Pinata.
const toSafeFilename = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export async function uploadToIPFS(
  imageUrl: string, // Temporary OpenAI/placeholder URL
  name: string, // Certificate recipient name
  certType: string, // Certificate type
  skills: string, // Skills list
  certificateText: string, // Full AI certificate text
): Promise<UploadResult> {
  try {
    // Rate limiting — get IP from request headers
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ??
      headersList.get("x-real-ip") ??
      "anonymous";

    const { success: allowed } = await uploadRatelimit.limit(ip);

    if (!allowed) {
      return {
        success: false,
        error:
          "Too many upload attempts. Please wait an hour before trying again.",
      };
    }

    // STEP 1: Download real image from the URL, pass through placeholders
    // OpenAI URLs expire after 1 hour — save to IPFS now!
    let imageUri: string;
    // Build readable Pinata filenames from the recipient and certificate type.
    const fileBaseName =
      toSafeFilename(`${name}-${certType}-certificate`) || "darkmint-certificate";

    const isPlaceholder = imageUrl.includes("placehold.co");

    if (isPlaceholder) {
      // Mock mode — just use the URL directly, no download needed
      imageUri = imageUrl;
    } else {
      // Real AI mode — download from OpenAI and upload to IPFS (URLs expire!)
      console.log("📥 Downloading image from URL...");
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      // Give the uploaded image a specific filename instead of certificate.png.
      const imageFile = new File([imageBlob], `${fileBaseName}.png`, {
        type: "image/png",
      });

      console.log("📤 Uploading image to IPFS...");
      // Save a human-friendly name in the Pinata dashboard.
      const imageUpload = await pinata.upload.public
        .file(imageFile)
        .name(`${fileBaseName}.png`);
      imageUri = `ipfs://${imageUpload.cid}`;
      console.log("✅ Image uploaded:", imageUri);
    }
    // STEP 3: Create NFT metadata JSON
    // This is the standard ERC721 metadata format
    // OpenSea, MetaMask, and all NFT platforms read this
    const metadata = {
      name: `${certType} Certificate — ${name}`,
      description: `This certificate recognizes ${name} for their expertise in ${certType}. Skills: ${skills}`,
      image: imageUri, // Points to IPFS image (not a temp URL!)
      // Store the full certificate text so it can be shown again later.
      certificateText,
      attributes: [
        { trait_type: "Certificate Type", value: certType },
        { trait_type: "Recipient", value: name },
        { trait_type: "Skills", value: skills },
        { trait_type: "Issued", value: new Date().toISOString().split("T")[0] },
        { trait_type: "Platform", value: "DarkMint" },
      ],
    };

    // STEP 4: Upload metadata JSON to IPFS
    console.log("📤 Uploading metadata to IPFS...");
    // Give the metadata file a readable name instead of data.json.
    const metadataUpload = await pinata.upload.public
      .json(metadata)
      .name(`${fileBaseName}.json`);
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
