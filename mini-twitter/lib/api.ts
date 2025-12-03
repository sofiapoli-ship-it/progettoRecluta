// lib/api.ts

export async function getPublicPosts() {
  try {
    const res = await fetch("https://api.twitter.server.jetop.com/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Errore API:", res.status);
      return [];
    }

    const data = await res.json();

    // La risposta ha forma: { items: [...], count, limit, offset }
    return data.items ?? [];
  } catch (err) {
    console.error("Errore nel fetch:", err);
    return [];
  }
}