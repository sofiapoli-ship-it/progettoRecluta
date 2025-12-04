// lib/api/posts/unlike.ts

export async function unlikePost(token: string, postId: string) {
  const res = await fetch(
    `https://api.twitter.server.jetop.com/api/posts/${postId}/unlike`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Errore unlike");
  }

  return res.json();
}