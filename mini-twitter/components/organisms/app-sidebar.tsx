import Link from "next/link";
import { Home, Heart, User, LogOut, PenSquare } from "lucide-react";

type AppSidebarProps = {
  active?: "home" | "likes" | "profile";
};

export function AppSidebar({ active = "home" }: AppSidebarProps) {
  // per ora dati finti, poi li prenderemo dall'API profilo
  const username = "sofia";
  const email = "sofia@poli.com";

  const baseItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition";
  const inactive = baseItem + " text-neutral-200 hover:bg-[#111827]";
  const activeClass = baseItem + " bg-[#0b1730] text-white";

  return (
    <aside className="hidden md:flex flex-col justify-between border-r border-[#111827] px-8 py-10 w-[280px] min-h-screen bg-[#020617]">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">MiniTwitter</h1>

        <div className="space-y-1 text-sm text-neutral-400">
          <p className="font-semibold text-white">@{username}</p>
          <p>{email}</p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium transition">
          <PenSquare size={18} />
          <span>Nuovo Post</span>
        </button>

        <nav className="mt-4 space-y-2 text-sm">
          <Link href="/" className={active === "home" ? activeClass : inactive}>
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link
            href="/likes"
            className={active === "likes" ? activeClass : inactive}
          >
            <Heart size={18} />
            <span>Likes</span>
          </Link>

          <Link
            href="/profile"
            className={active === "profile" ? activeClass : inactive}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-red-400 transition">
        <LogOut size={16} />
        <span>Esci</span>
      </button>
    </aside>
  );
}