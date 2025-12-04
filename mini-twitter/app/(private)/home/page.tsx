"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/organisms/app-shell";
import { PostCard } from "@/components/organisms/post-card";
import { getFeed } from "@/lib/api/posts/get-feed";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getFeed();
        setPosts(data ?? []);
      } catch (err) {
        console.error("Errore caricamento posts", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <AppShell active="home" title="Il tuo Feed">
      <div className="flex flex-col gap-4">

        {loading && <p className="text-gray-400">Caricamento...</p>}

        {!loading && posts.map((post) => (
          <PostCard
              key={post.id}
              username={post.users.username}
              handle={`@${post.users.username}`}   // ⭐ aggiungi questo
              content={post.content}
              time={post.created_at}
              likes={post.likes_count}
              comments={post.comments_count}
          />
        ))}

      </div>
    </AppShell>
  );
}