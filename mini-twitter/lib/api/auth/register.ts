// lib/api/auth/register.ts

import { apiFetch } from "../../api";

// ------------------
// Tipi della risposta secondo Swagger
// ------------------
export type RegisterUser = {
  id: number;
  username: string;
  email: string;
};

export type RegisterResponse = {
  user: RegisterUser;
  token: string;       // token temporaneo
  otp_secret: string;  // usato per configurare Google Authenticator
};

// ------------------
//Funzione register(): chiama POST /auth/register
// ------------------
// lib/api/auth/register.ts

export async function register(username: string, email: string, password: string) {
  try {
    const res = await fetch("https://api.twitter.server.jetop.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      return { error: err?.error || "Registrazione fallita" };
    }

    return await res.json();

  } catch (e: any) {
    console.error("Register API error:", e);
    return { error: "Errore di connessione al server." };
  }
}