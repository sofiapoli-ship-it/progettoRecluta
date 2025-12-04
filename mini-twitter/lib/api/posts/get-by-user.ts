// lib/api/posts/get-by-user.ts

export async function getPostsByUser(userId: string) {
  const res = await fetch(
    `https://api.twitter.server.jetop.com/api/posts/user/${userId}`
  );

  if (!res.ok) return [];

  return res.json();
}