// lib/api/posts/get-feed.ts

export type Post = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  users: {
    id: string;
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

    // lo swagger per /posts torna qualcosa tipo { items: [...] }
    if (Array.isArray(data)) return data as Post[];
    if (data.items && Array.isArray(data.items)) return data.items as Post[];

    return [];
  } catch (error) {
    console.error("Errore in getFeed():", error);
    return [];
  }
}