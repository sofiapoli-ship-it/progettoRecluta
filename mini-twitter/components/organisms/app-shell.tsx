import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { TopBar } from "./top-bar";

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
      <main className="text-white min-h-screen bg-[#020617]">

        {/* Top Bar */}
        <TopBar title={title ?? ""} />

        {/* Page Content */}
        <div className="px-4 py-6 max-w-[650px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}