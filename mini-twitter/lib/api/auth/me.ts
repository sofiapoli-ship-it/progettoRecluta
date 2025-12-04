// lib/api/auth/me.ts
import { apiFetch } from "../../api";

export type MeResponse = {
  user: {
    id: number;
    username: string;
    email: string;
    bio?: string | null;
  };
};

export async function me(token: string) {
  return apiFetch<MeResponse>("/auth/me", {
    method: "GET",
    token,
  });
}