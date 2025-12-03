"use client";

import { AppShell } from "@/components/organisms/app-shell";
import { PostCard } from "@/components/organisms/post-card";

const mockLikedPosts = [
  {
    id: 1,
    user: { username: "sofia" },
    createdAt: "2025-11-25T10:00:00Z",
    content: "Questo è un post che ti è piaciuto 💙",
    likesCount: 12,
    commentsCount: 3,
  }
];

export default function LikesPage() {
  return (
    <AppShell active="likes" title="I tuoi Mi Piace">
      <div className="flex flex-col gap-4">
        {mockLikedPosts.map((post) => (
          <PostCard
            key={post.id}
            username={post.user.username}
            handle={"@" + post.user.username}
            content={post.content}
            time={new Date(post.createdAt)}
            likes={post.likesCount}
            comments={post.commentsCount}
          />
        ))}
      </div>
    </AppShell>
  );
}