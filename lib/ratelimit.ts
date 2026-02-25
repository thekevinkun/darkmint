// ============================================
// Rate Limiter Configuration
// Protects Server Actions from spam/abuse
// ============================================

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client from Upstash
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiter for AI generation — most expensive operation
// 3 requests per hour per IP
export const generateRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  prefix: "darkmint:generate",
});

// Rate limiter for IPFS upload
// 5 requests per hour per IP
export const uploadRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "darkmint:upload",
});
