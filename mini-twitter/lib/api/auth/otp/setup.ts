// lib/api/auth/otp/setup.ts

import { apiFetch } from "../../../api";

export type OtpSetupResponse = {
  secret: string;
  otpauth_url: string;
};

export async function getOtpSetup(token: string): Promise<OtpSetupResponse> {
  return apiFetch<OtpSetupResponse>("/auth/otp/setup", {
    method: "GET",
    token,
  });
}