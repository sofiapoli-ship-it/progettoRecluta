// lib/api/auth/login.ts

export async function login(username: string, password: string) {
  try {
    const res = await fetch("https://api.twitter.server.jetop.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      console.error("Login API error:", res.status);
      return { success: false };
    }

    const data = await res.json();

    return {
      success: true,
      requires_otp: data.requires_otp ?? false,
      token: data.token ?? null,
      temp_token: data.temp_token ?? null,
    };
  } catch (err) {
    console.error("Login API failed", err);
    return { success: false };
  }
}