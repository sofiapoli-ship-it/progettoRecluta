import { LeftSidebar } from "@/components/organisms/left-sidebar";
import { TopBar } from "@/components/organisms/top-bar";
import { CreatePostBox } from "@/components/molecules/create-post-box";
import { PostCard } from "@/components/organisms/post-card";

export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_300px]">

      <LeftSidebar />

      <div className="border-r border-neutral-800 min-h-screen">
        <TopBar />
        <CreatePostBox />

        <PostCard
          username="Sofia"
          handle="soffypoli"
          time="2h"
          content="Sto costruendo un sito tipo Twitter! ✨"
          likes={23}
          comments={5}
        />

        <PostCard
          username="Mario"
          handle="mario_dev"
          time="5h"
          content="Questo progetto è davvero interessante 🔥"
          likes={10}
          comments={2}
        />
      </div>

      <div className="hidden lg:block p-6 text-neutral-500">
        Sidebar destra opzionale
      </div>

    </main>
  );
}