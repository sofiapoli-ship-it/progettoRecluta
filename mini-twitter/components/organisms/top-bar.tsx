"use client";

export function TopBar({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-20 bg-[#020617] border-b border-[#1a1f2e] px-4 py-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
  );
}