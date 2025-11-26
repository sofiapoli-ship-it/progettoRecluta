import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";

type Props = {
  children: ReactNode;
  active?: "home" | "likes" | "profile";
  title?: string;
};

export function AppShell({ children, active = "home", title }: Props) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr] bg-[#020617]">

      {/* Sidebar */}
      <div className="border-r border-[#111827]">
        <AppSidebar active={active} />
      </div>

      {/* Main area */}
      <section className="text-white border-l border-[#0F1629]">

        {/* Top Title */}
        {title && (
          <div className="border-b border-[#1a1f2e] px-6 py-4 sticky top-0 bg-[#020617] z-10">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}

        {/* Feed Container */}
        <div className="px-4 py-6 max-w-[620px] mx-auto">
          {children}
        </div>

      </section>
    </div>
  );
}