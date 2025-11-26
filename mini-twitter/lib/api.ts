const BASE_URL = "https://api.twitter.server.jetop.com/api";

export async function apiLogin(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Credenziali non valide");
  }

  return res.json(); // { temporaryToken }
}

export async function apiVerifyOtp(tempToken: string, otp: string) {
  const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${tempToken}`
    },
    body: JSON.stringify({ otp }),
  });

  if (!res.ok) {
    throw new Error("OTP non valido");
  }

  return res.json(); // { accessToken }
}