export async function me(token: string) {
  try {
    const res = await fetch("http://localhost:4000/api/auth/me", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) return null;

    return await res.json();

  } catch (err) {
    console.error("Me API failed:", err);
    return null;
  }
}