"use client";

import { useEffect, useState } from "react";
import { PublicSidebar } from "@/components/organisms/public-sidebar";
import { PostCard } from "@/components/organisms/post-card";
import { PublicTopBar } from "@/components/organisms/public-topbar";

import { getFeed } from "@/lib/api/posts/get-feed"; // ⭐ Usa la nuova API centralizzata

export default function PublicHomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getFeed(); // ⭐ API UNIFICATA
        setPosts(data ?? []);
      } catch (err) {
        console.error("Errore caricamento feed pubblico:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-[#030616] text-white">

      {/* SIDEBAR */}
      <PublicSidebar />

      {/* MAIN FEED */}
      <main className="flex-1 max-w-2xl">

        <PublicTopBar />

        <div className="px-16 pt-4">

          {/* Loading */}
          {loading && (
            <p className="text-[#A2A8B3]">Caricamento...</p>
          )}

          {/* Nessun post */}
          {!loading && posts.length === 0 && (
            <p className="text-[#A2A8B3]">Nessun post disponibile.</p>
          )}

          {/* Post */}
          {posts.map((p: any) => (
            <PostCard
              key={p.id}
              username={p.user?.username ?? "unknown"}
              handle={`@${p.user?.username ?? "unknown"}`}
              content={p.content}
              time={p.created_at}
              likes={p.likes_count}
              comments={p.comments_count}
            />
          ))}
        </div>

      </main>
    </div>
  );
}