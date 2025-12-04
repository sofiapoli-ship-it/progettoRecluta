"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Home, Heart, User, LogOut } from "lucide-react";
import { me } from "@/lib/api/auth/me";

type Props = {
  active?: "home" | "likes" | "profile" | null;
};

export function AppSidebar({ active = null }: Props) {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const profile = await me(token);
      if (profile && profile.user) {
        setUser({
          username: profile.user.username,
          email: profile.user.email,
        });
      }
    }

    loadUser();
  }, []);

  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-[260px] px-6 py-8 border-[#1F2937] bg-[#020617] text-white">
      
      {/* ---- TOP PART ---- */}
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-white">MiniTwitter</h1>

        {/* User Info */}
        <div>
          <p className="font-semibold">
            @{user?.username ?? "loading"}
          </p>
          <p className="text-sm text-neutral-400">
            {user?.email ?? "loading..."}
          </p>
        </div>

        {/* New Post Button */}
        <Link
          href="/post"
          className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] transition text-white font-semibold py-3 rounded-full"
        >
          <Pencil size={18} /> Nuovo Post
        </Link>

        {/* Menu Links */}
        <nav className="flex flex-col gap-2 mt-2 text-neutral-300">
          <SidebarItem
            href="/home"
            label="Home"
            icon={<Home size={20} />}
            active={active === "home"}
          />

          <SidebarItem
            href="/likes"
            label="Likes"
            icon={<Heart size={20} />}
            active={active === "likes"}
          />

          <SidebarItem
            href="/profile"
            label="Profile"
            icon={<User size={20} />}
            active={active === "profile"}
          />
        </nav>
      </div>

      {/* ---- BOTTOM PART ---- */}
      <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition">
        <LogOut size={18} /> Esci
      </button>

    </aside>
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
};

function SidebarItem({ href, label, icon, active }: SidebarItemProps) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer
          ${
            active
              ? "bg-[#0F1A2F] text-[#3B82F6]"
              : "text-white hover:bg-[#1E293B] hover:text-white"
          }
        `}
      >
        <span className={active ? "text-[#3B82F6]" : "text-white"}>{icon}</span>
        <span className={`text-base ${active ? "text-[#3B82F6]" : "text-white"}`}>
          {label}
        </span>
      </div>
    </Link>
  );
}