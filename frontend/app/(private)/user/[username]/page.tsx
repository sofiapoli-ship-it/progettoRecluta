"use client";

import { AppShell } from "@/components/organisms/app-shell";
import { PostCard } from "@/components/organisms/post-card";
import { useParams } from "next/navigation";

// Mock provvisori
const mockUser = {
  username: "sofia",
  bio: "",
  createdAt: "2024-09-10T08:00:00Z",
};

const mockPosts = [
  {
    id: 1,
    user: { username: "sofia" },
    createdAt: "2025-11-25T10:00:00Z",
    content: "Questo è uno dei miei post ✨",
    likesCount: 5,
    commentsCount: 1,
  },
];

export default function UserProfilePage() {
  const { username } = useParams();

  return (
    <AppShell active="profile" title="Profilo">
      <div className="bg-[#0D1220] border border-[#1f2937] rounded-xl p-6 max-w-[650px] mx-auto">

        <h2 className="text-xl font-semibold mb-1">Informazioni utente</h2>
        <p className="text-sm text-gray-400 mb-6">I tuoi dati personali</p>

        <p className="text-sm text-gray-400">Username</p>
        <p className="text-white mb-4">@{mockUser.username}</p>

        <p className="text-sm text-gray-400">Email</p>
        <p className="text-white mb-4">{mockUser.username}@poli.com</p>

        <p className="text-sm text-gray-400">Bibliografia/Bio</p>
        <p className="text-gray-300 italic mb-6">
          Nessuna bio aggiunta. <a className="text-blue-400 cursor-pointer">Aggiungine una!</a>
        </p>

        <button className="w-full bg-blue-500 py-2 rounded-lg mb-3">
          ✏️ Modifica profilo
        </button>

        <button className="w-full bg-red-600 py-2 rounded-lg">
          🚪 Esci dall'account
        </button>

      </div>

      {/* Post */}
      <div className="mt-10 max-w-[650px] mx-auto">
        <h3 className="text-center text-gray-400 mb-4">Post ({mockPosts.length})</h3>

        {mockPosts.map((post) => (
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