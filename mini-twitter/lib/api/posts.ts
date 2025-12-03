export interface Post {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  user: {
    username: string;
    handle: string;
  };
}

export async function getPublicPosts(limit = 20, offset = 0): Promise<Post[]> {
  const url = `https://api.twitter.server.jetop.com/api/posts?limit=${limit}&offset=${offset}`;

  const res = await fetch(url, { cache: "no-cache" });

  if (!res.ok) {
    console.error("Errore API:", await res.text());
    throw new Error("Errore nel fetch dei post pubblici");
  }

  const json = await res.json();

  console.log("RISPOSTA API COMPLETA:", json);

  // L’API ritorna { data: [...] }
  return json.data ?? [];
}