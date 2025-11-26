import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";

type Props = {
  children: ReactNode;
  active?: "home" | "likes" | "profile";
  title?: string;
};

export function AppShell({ children, active = "home", title }: Props) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <AppSidebar active={active} />

      {/* Contenuto principale */}
      <section className="bg-[#020617] text-white min-h-screen">
        {/* Top Title */}
        {title && (
          <div className="border-b border-[#111827] px-8 py-6">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}

        <div className="px-8 py-6">
          {children}
        </div>
      </section>
    </div>
  );
}