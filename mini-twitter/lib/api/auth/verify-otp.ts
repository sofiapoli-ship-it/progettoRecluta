// lib/api/auth/verify-otp.ts

import { apiFetch } from "../../api";

export type VerifyOtpResponse = {
  success: boolean;
  token?: string;  // token finale JWT
  user?: {
    id: number;
    username: string;
    email: string;
  };
};

export async function verifyOtp(temp_token: string, otp_token: string) {
  return apiFetch<VerifyOtpResponse>("/auth/verify-otp", {
    method: "POST",
    body: { temp_token, otp_token },
  });
}