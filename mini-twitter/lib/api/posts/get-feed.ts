// lib/api/posts/get-feed.ts

export type Post = {
  id: string;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  user: {
    username: string;
  };
};

export async function getFeed(): Promise<Post[]> {
  try {
    const res = await fetch("https://api.twitter.server.jetop.com/api/posts", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API posts response not ok:", res.status);
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (data.items && Array.isArray(data.items)) return data.items;

    return [];
  } catch (error) {
    console.error("Errore in getFeed():", error);
    return [];
  }
}