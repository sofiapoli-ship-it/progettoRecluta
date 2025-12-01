import Link from "next/link";

export function PublicSidebar() {
  return (
    <aside className="hidden md:flex flex-col justify-between bg-[#030616] text-white h-screen w-[360px] px-10 py-12 border-r border-[#1F2937]">
      {/* TOP */}
      <div className="flex flex-col gap-10">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold">MiniTwitter</h1>

        {/* Testo introduttivo */}
        <div>
          <h2 className="text-2xl font-bold leading-tight">
            Partecipa alla <br /> conversazione
          </h2>
        </div>

        {/* Pulsanti */}
        <div className="flex flex-col gap-4">
          <Link
            href="/signup"
            className="bg-[#1D9BF0] hover:bg-[#1A8CD8] transition text-white font-semibold py-3 rounded-full text-center"
          >
            Crea account
          </Link>

          <Link
            href="/login"
            className="bg-transparent border border-gray-500 hover:bg-gray-800 transition text-white font-semibold py-3 rounded-full text-center"
          >
            Accedi
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col text-gray-400 text-sm gap-1">
        <Link href="#" className="hover:underline">Termini di servizio</Link>
        <Link href="#" className="hover:underline">Informativa sulla privacy</Link>
      </div>
    </aside>
  );
}