// lib/api/auth/me.ts

export async function me(token: string) {
  try {
    const res = await fetch("https://api.twitter.server.jetop.com/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Me API error:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Me API failed:", err);
    return null;
  }
}