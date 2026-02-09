// ============================================
// OpenAI Client Configuration
// Handles AI text and image generation
// ============================================

// Import OpenAI SDK
import OpenAI from "openai";

// Initialize OpenAI client with API key from environment
// This client will be used in Server Actions to call GPT-4 and DALL-E
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Check if we should use real AI or mock
// This allows us to save money during development
export const USE_REAL_AI = process.env.NEXT_PUBLIC_USE_REAL_AI === "true";
