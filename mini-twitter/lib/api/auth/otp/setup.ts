// lib/api/auth/otp/setup.ts

export async function otpSetup(token: string) {
  try {
    const res = await fetch("https://api.twitter.server.jetop.com/api/auth/otp/setup", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}