// lib/api/auth/otp/status.ts

import { apiFetch } from "../../../api";

export type OtpStatusResponse = {
  has_otp: boolean;
  message: string;
};

export async function getOtpStatus(token: string): Promise<OtpStatusResponse> {
  return apiFetch<OtpStatusResponse>("/auth/otp/status", {
    method: "GET",
    token,
  });
}