import Link from "next/link";
import { Pencil, Home, Heart, User, LogOut } from "lucide-react";

type Props = {
  active?: "home" | "likes" | "profile";
};

export function AppSidebar({ active = "home" }: Props) {
  return (
    <aside className="hidden md:flex flex-col justify-between bg-[#0E1424] text-white h-screen w-[260px] px-6 py-8 border-r border-[#1F2937]">

      {/* --- TOP --- */}
      <div className="flex flex-col gap-8">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold">MiniTwitter</h1>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="font-semibold text-[16px]">@sofia</span>
          <span className="text-[#9CA3AF] text-[14px] leading-tight">
            sofia@poli.com
          </span>
        </div>

        {/* New Post Button */}
        <Link
          href="/post"
          className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] transition text-white font-semibold py-3 rounded-full text-[15px]"
        >
          <Pencil size={18} />
          Nuovo Post
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-2">
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

      {/* --- BOTTOM LOGOUT --- */}
      <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition text-[15px]">
        <LogOut size={18} />
        Esci
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
            : "text-[#9CA3AF] hover:bg-[#0E1A2A] hover:text-white"}
        `}
      >
        <div className={active ? "text-[#3B82F6]" : "text-[#9CA3AF]"}>
          {icon}
        </div>

        <span className="text-[16px] font-medium">{label}</span>
      </div>
    </Link>
  );
}