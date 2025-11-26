import Link from "next/link";
import { Pencil, Home, Heart, User, LogOut } from "lucide-react";

type Props = {
  active?: "home" | "likes" | "profile";
};

export function AppSidebar({ active = "home" }: Props) {
  return (
    <aside className="hidden md:flex flex-col justify-between bg-[#0D1220] text-white h-screen w-[260px] px-6 py-8 border-r border-[#111827]">
      
      {/* ---- TOP PART ---- */}
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-white">MiniTwitter</h1>

        {/* User Info */}
        <div>
          <p className="font-semibold">@sofia</p>
          <p className="text-sm text-neutral-400">sofia@poli.com</p>
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
            href="/"
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
    <Link href={href} className="block">
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
          ${active 
            ? "bg-[#0E1A36] text-[#3B82F6]" 
            : "text-neutral-300 hover:bg-[#0E1A2A] hover:text-white"
          }
        `}
      >
        <div className={active ? "text-[#3B82F6]" : "text-neutral-400"}>
          {icon}
        </div>

        <span className="text-[17px] font-medium">{label}</span>
      </div>
    </Link>
  );
}