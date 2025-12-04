// lib/api/index.ts

// AUTH BASE
export * from "./auth/register";
export * from "./auth/login";
export * from "./auth/verify-otp";
export * from "./auth/logout";
export * from "./auth/me";

// OTP
export * from "./auth/otp/setup";
export * from "./auth/otp/status";

// POSTS (se già creati)
export * from "./posts/get-feed";
export * from "./posts/create";
export * from "./posts/like";
export * from "./posts/unlike";
export * from "./posts/get-by-user";