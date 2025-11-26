"use client";

import { AppShell } from "@/components/organisms/app-shell";
import { PostCard } from "@/components/organisms/post-card";

export default function Page() {
  return (
    <AppShell active="home" title="Il tuo Feed">

      <PostCard
        username="pasq"
        handle="@pasq"
        content="test"
        likes={0}
        comments={0}
      />

      <PostCard
        username="giusti"
        handle="@giusti"
        content="ciao"
        likes={1}
        comments={1}
      />

    </AppShell>
  );
}