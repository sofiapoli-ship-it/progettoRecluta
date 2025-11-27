"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/organisms/app-shell";
import { PostCard } from "@/components/organisms/post-card";
import { getUserByUsername, getUserPosts } from "@/lib/api";
import { useAuth } from "@/contexts/auth";

export default function UserPage({ params }: { params: { username: string } }) {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);

  const username = params.username;

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const userInfo = await getUserByUsername(username, token);
        const userPosts = await getUserPosts(username, token);

        setProfile(userInfo);
        setPosts(userPosts);
      } catch (err) {
        console.error("Errore caricamento profilo:", err);
      } finally {
        setLoadingPage(false);
      }
    }

    loadData();
  }, [username]);

  // Loading dello stato auth
  if (loading) {
    return (
      <AppShell title="Profilo">
        <p className="text-neutral-400">Caricamento...</p>
      </AppShell>
    );
  }

  // Se l’utente non è loggato, redirect
  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <AppShell title={profile ? profile.username : "Profilo"}>
      {loadingPage ? (
        <p className="text-neutral-400">Caricamento profilo...</p>
      ) : !profile ? (
        <p className="text-red-400">Utente non trovato.</p>
      ) : (
        <div className="space-y-8">

          {/* CARD PROFILO */}
          <div className="bg-[#0F1629] p-6 rounded-xl border border-[#1E293B]">
            <h2 className="text-xl font-semibold mb-2 text-white">
              {profile.username}
            </h2>

            <p className="text-neutral-400 mb-1">{profile.email}</p>

            {/* BIO */}
            {profile.bio ? (
              <p className="text-neutral-300 text-sm italic">{profile.bio}</p>
            ) : (
              <p className="text-neutral-600 text-sm italic">
                Nessuna bio aggiunta.
              </p>
            )}

            {/* STATISTICHE */}
            <div className="flex gap-6 mt-4 text-neutral-300 text-sm">
              <span>
                <strong>{profile.postsCount}</strong> Post
              </span>
              <span>
                <strong>{profile.commentsCount}</strong> Commenti
              </span>
              <span>
                <strong>{profile.likesReceived}</strong> Mi piace
              </span>
            </div>
          </div>

          {/* LISTA POST UTENTE */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Post</h3>

            {posts.length === 0 ? (
              <p className="text-neutral-500">Nessun post pubblicato.</p>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  username={post.user.username}
                  handle={"@" + post.user.username}
                  time={new Date(post.createdAt)}
                  content={post.content}
                  likes={post.likesCount}
                  comments={post.commentsCount}
                />
              ))
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}