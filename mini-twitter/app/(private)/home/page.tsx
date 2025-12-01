"use client";

import { useEffect, useState } from "react";
import { PostCard } from "@/components/organisms/post-card";

type ApiPost = {
  id: number;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  user: {
    username: string;
  };
};

export default function PublicHomePage() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(
          "https://twitter.server.jetop.com/api/posts?limit=20&offset=0"
        );

        if (!res.ok) {
          throw new Error("Errore nel caricamento dei post");
        }

        const data = await res.json();
        // Lo Swagger di solito restituisce { data: [...] }
        const list = Array.isArray(data.data) ? data.data : data;

        setPosts(list);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="max-w-[650px] mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Discover</h1>

      <div className="flex flex-col gap-4">
        {loading && (
          <p className="text-gray-400 text-sm mt-4">Caricamento...</p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-gray-400 text-sm mt-4">
            Nessun post disponibile.
          </p>
        )}

        {!loading &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              username={post.user.username}
              handle={`@${post.user.username}`}
              content={post.content}
              time={post.createdAt}
              likes={post.likesCount}
              comments={post.commentsCount}
            />
          ))}
      </div>
    </div>
  );
}