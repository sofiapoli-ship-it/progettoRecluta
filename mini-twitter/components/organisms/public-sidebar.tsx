"use client";

import Link from "next/link";

export function PublicSidebar() {
  return (
    <aside
      className="min-h-screen w-[380px] bg-[#030616] border-r border-[#1E2535] flex flex-col justify-between pl-24 pr-10 py-16"
    >
      {/* Contenitore interno (per controllare larghezza testo) */}
      <div className="max-w-[260px]">
        
        {/* Titolo */}
        <h2 className="text-4xl font-extrabold text-white leading-tight mb-12">
          Partecipa alla<br/>conversazione
        </h2>

        {/* Pulsanti */}
        <div className="flex flex-col gap-4">
          <Link
            href="/signup"
            className="bg-[#217FE9] hover:bg-[#1a8cd8] transition
                       text-white font-semibold text-lg py-3 rounded-full
                       text-center"
          >
            Crea account
          </Link>

          <Link
            href="/login"
            className="border border-[#3A4354] text-white
                       text-lg py-3 rounded-full text-center
                       hover:bg-[#111827]"
          >
            Accedi
          </Link>
        </div>
      </div>

      {/* Link in basso */}
      <div className="pb-8 text-sm ml-2">
        <Link href="#" className="text-[#4B83FF] block">
          Termini di servizio
        </Link>
        <Link href="#" className="text-[#4B83FF] block mt-2">
          Informativa sulla privacy
        </Link>
      </div>
    </aside>
  );
}