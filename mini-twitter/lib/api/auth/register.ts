// lib/api/auth/register.ts
import { apiFetch } from "../../api";

export type User = {
  id: number;
  username: string;
  email: string;
  bio?: string | null;
};

export type RegisterResponse = {
  user: User;
  token: string;        // token temporaneo
  otp_secret: string;   // secret per configurare Google Authenticator
};

export async function register(
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: { username, email, password },
  });
}