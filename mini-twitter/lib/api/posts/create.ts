// lib/api/posts/create.ts

export async function createPost(token: string, content: string) {
  const res = await fetch("https://api.twitter.server.jetop.com/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Errore creazione post");
  }

  return res.json();
}