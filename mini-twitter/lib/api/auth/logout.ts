// lib/api/auth/logout.ts

import { apiFetch } from "../../api";

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export async function logout(token: string): Promise<LogoutResponse> {
  return apiFetch<LogoutResponse>("/auth/logout", {
    method: "POST",
    token,
  });
}