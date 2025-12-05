// app/(private)/home/page.tsx
"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/organisms/app-shell";
import { PostCard } from "@/components/organisms/post-card";

import { getFeed, Post } from "@/lib/api/posts/get-feed";
import { getPostDetails } from "@/lib/api/posts/get-posts-details";

// Post del feed + contatori
type PostWithCounts = Post & {
  likes_count: number;
  comments_count: number;
};

export default function HomePage() {
  const [posts, setPosts] = useState<PostWithCounts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // 1) prendo il feed base
        const feed = await getFeed(); // Post[]

        // 2) per ogni post chiedo likes/commenti
        const enriched: PostWithCounts[] = await Promise.all(
          feed.map(async (p) => {
            const details = await getPostDetails(p.id);

            const likes_count = details?.likes?.length ?? 0;
            const comments_count = details?.comments?.length ?? 0;

            return {
              ...p,
              likes_count,
              comments_count,
            };
          })
        );

        setPosts(enriched);
      } catch (err) {
        console.error("Errore caricamento home:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <AppShell active="home" title="Home">
      {loading && (
        <p className="text-neutral-400">Caricamento...</p>
      )}

      {!loading && posts.length === 0 && (
        <p className="text-neutral-400">Nessun post disponibile.</p>
      )}

      {!loading && posts.map((p) => (
        <PostCard
          key={p.id}
          username={p.users.username}
          handle={`@${p.users.username}`}
          time={p.created_at}
          content={p.content}
          likes={p.likes_count}
          comments={p.comments_count}
        />
      ))}
    </AppShell>
  );
}