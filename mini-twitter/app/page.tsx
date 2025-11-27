"use client";

import { AppShell } from "@/components/organisms/app-shell";
import { PostCard } from "@/components/organisms/post-card";

const mockPosts = [
  {
    id: 1,
    user: { username: "sofia" },
    createdAt: "2025-11-25T10:00:00Z",
    content: "Questo è un post mock-up ✨",
    likesCount: 12,
    commentsCount: 3,
  },
  {
    id: 2,
    user: { username: "mario" },
    createdAt: "2025-11-24T17:20:00Z",
    content: "Sto provando MiniTwitter! 🚀",
    likesCount: 4,
    commentsCount: 1,
  },
];

export default function HomePage() {
  return (
    <AppShell title="Feed mock-up">
      {mockPosts.map((post) => (
        <PostCard
          key={post.id}
          username={post.user.username}
          handle={"@" + post.user.username}
          time={post.createdAt ? new Date(post.createdAt) : null}
          content={post.content}
          likes={post.likesCount}
          comments={post.commentsCount}
        />
      ))}
    </AppShell>
  );
}