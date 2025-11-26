import Link from "next/link";
import { Home, Search, User, Settings } from "lucide-react";

export function LeftSidebar() {
  return (
    <aside className="hidden md:flex flex-col gap-6 px-6 py-8 border-r border-neutral-800 h-screen sticky top-0 w-[260px]">
      <h1 className="text-2xl font-extrabold tracking-tight">MiniTwitter</h1>

      <nav className="flex flex-col gap-4 text-lg">
        <Link 
          href="/" 
          className="flex items-center gap-3 p-2 rounded-full hover:bg-neutral-800 transition"
        >
          <Home size={22} /> Home
        </Link>

        <Link 
          href="/search" 
          className="flex items-center gap-3 p-2 rounded-full hover:bg-neutral-800 transition"
        >
          <Search size={22} /> Search
        </Link>

        <Link 
          href="/profile" 
          className="flex items-center gap-3 p-2 rounded-full hover:bg-neutral-800 transition"
        >
          <User size={22} /> Profile
        </Link>

        <Link 
          href="/settings" 
          className="flex items-center gap-3 p-2 rounded-full hover:bg-neutral-800 transition"
        >
          <Settings size={22} /> Settings
        </Link>
      </nav>
    </aside>
  );
}