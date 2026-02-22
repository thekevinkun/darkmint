// ============================================
// Server Actions - DUAL VERSION
// Functions that run on the server (not client)
// Supports both REAL AI and MOCK mode
// ============================================

"use server";

import { openai, USE_REAL_AI } from "@/lib/openai";

// Define the shape of our return data
// This helps TypeScript know what to expect
interface GenerateResult {
  success: boolean; // Did the generation succeed?
  certificateText?: string; // Generated text (if success)
  imageUrl?: string; // Generated image URL (if success)
  error?: string; // Error message (if failed)
  mode?: string; // Which mode was used (for debugging)
}

// ============================================
// Generate Certificate Server Action
// Calls OpenAI OR uses mock data based on flag
// ============================================
export async function generateCertificate(
  prevState: any, // Previous form state (for useActionState)
  formData: FormData, // Form data submitted by user
): Promise<GenerateResult> {
  try {
    // Extract form values
    const name = formData.get("name") as string; // User's name
    const certType = formData.get("certType") as string; // Certificate type
    const skills = formData.get("skills") as string; // User's skills

    // Validate inputs - make sure user filled out all fields
    if (!name || !certType || !skills) {
      return {
        success: false,
        error: "Please fill out all fields", // Show error if missing data
      };
    }

    // CHOOSE VERSION: Real AI vs Mock

    if (USE_REAL_AI) {
      // REAL AI VERSION - Costs money but real results
      return await generateWithRealAI(name, certType, skills);
    } else {
      // MOCK VERSION - Free but simulated results
      return await generateWithMock(name, certType, skills);
    }
  } catch (err: unknown) {
    const error = err as Error;
    // If anything goes wrong, catch the error and return it
    console.error("❌ Error generating certificate:", error);

    return {
      success: false,
      error:
        error.message || "Failed to generate certificate. Please try again.",
    };
  }
}

// REAL AI VERSION - Uses OpenAI API
// Cost: ~$0.07-0.12 per generation
async function generateWithRealAI(
  name: string,
  certType: string,
  skills: string,
): Promise<GenerateResult> {
  console.log("💰 Using REAL AI (GPT-4 + DALL-E 3)");

  // STEP 1: Generate Certificate Text with GPT-4

  console.log("🤖 Generating certificate text with GPT-4...");

  const textResponse = await openai.chat.completions.create({
    model: "gpt-4", // Use GPT-4 for high-quality text
    messages: [
      {
        role: "system", // System message sets the AI's behavior
        content:
          "You are a professional certificate writer. Create formal, inspiring certificate text.",
      },
      {
        role: "user", // User message is our prompt
        content: `Generate professional certificate text for:
            Name: ${name}
            Certificate Type: ${certType}
            Skills/Achievements: ${skills}

            Format the response with:
            - A formal title
            - 2-3 paragraphs describing the achievement
            - Recognition of specific skills
            - Congratulatory closing

            Keep it professional but inspiring. Write it as the actual certificate text (not instructions).`,
      },
    ],
    temperature: 0.7, // Creativity level (0-1, higher = more creative)
    max_tokens: 500, // Limit response length
  });

  // Extract the generated text from the response
  const certificateText = textResponse.choices[0].message.content || "";

  console.log("✅ Certificate text generated!");

  // STEP 2: Generate Certificate Image with DALL-E 3

  console.log("🎨 Generating certificate image with DALL-E 3...");

  const imageResponse = await openai.images.generate({
    model: "dall-e-3", // Use DALL-E 3 for high-quality images
    prompt: `Create a professional digital certificate with a dark cyberpunk aesthetic.
        Style Requirements:
        - Dark background (deep navy blue, purple, black gradients)
        - Purple and pink neon accents and glows (#a855f7, #ff00ff, #e91e63)
        - Futuristic AI/Virtual Reality aesthetic
        - Geometric patterns, grid lines, or circuit board elements
        - Professional but modern and high-tech

        Certificate Context:
        - Type: ${certType}
        - Recipient: ${name}

        Design Elements:
        - Decorative borders with neon highlights
        - Subtle hexagonal or geometric grid patterns
        - Purple and pink gradient accents
        - Professional layout with space for text overlay
        - Dark, sophisticated, cyberpunk style
        - Should look official and impressive

        No text on the certificate - just the decorative background and design elements.`,
    size: "1024x1024", // Square image
    quality: "standard", // 'standard' or 'hd' (hd costs 2x more)
    n: 1, // Generate 1 image
  });

  // Extract the image URL from the response
  const imageUrl = imageResponse.data ? imageResponse.data[0].url : "";

  console.log("✅ Certificate image with real AI costs is generated!");

  return {
    success: true,
    certificateText,
    imageUrl,
    mode: "💰 Real AI (GPT-4 + DALL-E 3)",
  };
}

// MOCK VERSION - Simulates AI without cost
// Cost: $0.00 per generation
async function generateWithMock(
  name: string,
  certType: string,
  skills: string,
): Promise<GenerateResult> {
  console.log("🆓 Using MOCK VERSION (free!)");

  // Simulate AI processing delay (makes it feel real)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate realistic certificate text (template-based)
  const certificateText = `CERTIFICATE OF ACHIEVEMENT
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    This certificate is proudly presented to

    ${name.toUpperCase()}

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    In recognition of exceptional expertise and outstanding achievement in the field of ${certType}.

    ${name} has demonstrated remarkable proficiency and skill in: ${skills}

    This certificate acknowledges their dedication, innovation, and significant contributions to advancing their craft. Their commitment to excellence serves as an inspiration and sets a standard of achievement in the industry.

    Through continuous learning, practical application, and unwavering determination, ${name} has proven their mastery and earned this distinguished recognition.

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Awarded with highest distinction
    DarkMint Certification Authority

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  // Use a high-quality free placeholder image with purple/pink theme
  const imageUrl = `https://placehold.co/1024x1024/1e2740/a855f7?text=${encodeURIComponent(certType + " Certificate")}&font=montserrat`;

  console.log("✅ Mock certificate generated (free!)");

  return {
    success: true,
    certificateText,
    imageUrl,
    mode: "🆓 Mock Version (Development)",
  };
}
