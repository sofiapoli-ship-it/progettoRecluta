// lib/api/auth/otp/status.ts

export async function otpStatus(token: string) {
  try {
    const res = await fetch("https://api.twitter.server.jetop.com/api/auth/otp/status", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}