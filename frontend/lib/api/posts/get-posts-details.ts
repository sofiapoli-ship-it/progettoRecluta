// lib/api/posts/get-post-details.ts

export type PostDetailsResponse = {
  post: {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
  };
  likes: any[];
  comments: any[];
};

export async function getPostDetails(id: string): Promise<PostDetailsResponse | null> {
  try {
    const res = await fetch(`https://api.twitter.server.jetop.com/api/posts/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Errore getPostDetails:", res.status);
      return null;
    }

    return (await res.json()) as PostDetailsResponse;
  } catch (err) {
    console.error("Errore getPostDetails:", err);
    return null;
  }
}