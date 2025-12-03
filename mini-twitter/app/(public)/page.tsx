"use client";

import { useEffect, useState } from "react";
import { PublicSidebar } from "@/components/organisms/public-sidebar";
import { PostCard } from "@/components/organisms/post-card";
import { PublicTopBar } from "@/components/organisms/public-topbar";

export default function PublicHomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://api.twitter.server.jetop.com/api/posts");
        const data = await res.json();
        setPosts(data.items);
      } catch (err) {
        console.error("Errore fetch:", err);
        setPosts([]);
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

        {/* TOP BAR */}
        <PublicTopBar />

        {/* FEED */}
        <div className="px-16 pt-4">
          {posts.length === 0 && (
            <p className="text-[#A2A8B3]">Nessun post disponibile.</p>
          )}

          {posts.map((p: any) => (
            <PostCard
              key={p.id}
              username={p.users.username}
              handle={`@${p.users.username}`}   // ⭐ aggiungi questo
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