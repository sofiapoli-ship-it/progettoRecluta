// lib/api/posts/like.ts

export async function likePost(token: string, postId: string) {
  const res = await fetch(
    `https://api.twitter.server.jetop.com/api/posts/${postId}/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Errore like");
  }

  return res.json();
}