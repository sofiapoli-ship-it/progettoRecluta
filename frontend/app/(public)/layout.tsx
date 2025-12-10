import { PublicSidebar } from "@/components/organisms/public-sidebar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-[#030616] text-white">
      
      {/* Sidebar pubblica */}
      <PublicSidebar />

      {/* Contenuto della pagina */}
      <div className="flex-1 px-10 py-14">
        {children}
      </div>
    </div>
  );
}