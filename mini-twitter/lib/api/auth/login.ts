// lib/api/auth/login.ts
import { apiFetch } from "../../api";

export type LoginResponse = {
  success: boolean;
  requires_otp?: boolean;
  token?: string;        // se OTP non richiesto
  temp_token?: string;   // se OTP richiesto
  user?: {
    id: number;
    username: string;
    email: string;
  };
};

export async function login(username: string, password: string) {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: { username, password },
  });
}