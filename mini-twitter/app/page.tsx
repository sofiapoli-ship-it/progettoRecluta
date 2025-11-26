import { Navbar } from "@/components/organisms/navbar";
import { CreatePostBox } from "@/components/molecules/create-post-box";
import { PostCard } from "@/components/organisms/post-card";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto space-y-6 p-4">

      <Navbar />

      <CreatePostBox />

      <PostCard
        username="soffypoli"
        content="Sto costruendo Mini Twitter con Next.js! 🚀"
        likes={12}
        comments={4}
      />

      <PostCard
        username="marta_dev"
        content="Ciao Sof! Questo progetto è super! 💛"
        likes={4}
        comments={1}
      />

    </main>
  );
}