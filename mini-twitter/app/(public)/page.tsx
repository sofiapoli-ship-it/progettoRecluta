"use client";

import { useEffect, useState } from "react";
import { PostCard } from "@/components/organisms/post-card";
import { PublicSidebar } from "@/components/organisms/public-sidebar";

export default function PublicHomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setPosts([
      {
        id: 1,
        username: "incognito",
        handle: "@incognito",
        time: "2025-11-29T12:04:00Z",
        content: "testiamo un altro po' aaa",
        likes: 2,
        comments: 1,
      },
      {
        id: 2,
        username: "pasq",
        handle: "@pasq",
        time: "2025-11-28T20:12:00Z",
        content: "elelea",
        likes: 2,
        comments: 2,
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#030616] flex">

      {/* Sidebar */}
      <PublicSidebar />

      {/* Main content */}
      <main className="flex-1 py-10 px-8">
        <h1 className="text-white text-3xl font-bold mb-10">Discover</h1>

        <div className="max-w-2xl">
          {posts.map((post) => (
            <div key={post.id} className="mb-6">
              <PostCard
                username={post.username}
                handle={post.handle}
                time={post.time}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
              />
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}