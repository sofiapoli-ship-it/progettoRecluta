import Link from "next/link";

export function LeftSidebar() {
  return (
    <aside className="hidden md:flex flex-col gap-6 px-6 py-8 border-r border-neutral-800 h-screen sticky top-0">
      <h1 className="text-2xl font-bold">MiniTwitter</h1>

      <nav className="flex flex-col gap-4 text-lg">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/search" className="hover:text-blue-400 transition">Search</Link>
        <Link href="/profile" className="hover:text-blue-400 transition">Profile</Link>
        <Link href="/settings" className="hover:text-blue-400 transition">Settings</Link>
      </nav>
    </aside>
  );
}