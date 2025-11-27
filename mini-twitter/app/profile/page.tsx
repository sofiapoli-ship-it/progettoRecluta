"use client";

import { AppShell } from "@/components/organisms/app-shell";
import { useAuth } from "@/contexts/auth";
import { Pencil, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <AppShell title="Profilo" active="profile">
      <div className="max-w-3xl mx-auto pt-6">

        {/* CARD PROFILO */}
        <div className="bg-[#0F172A] border border-[#1E293B] shadow-lg rounded-2xl p-8 mb-14">

          {/* TITOLO */}
          <h2 className="text-xl font-semibold text-white mb-1">
            Informazioni utente
          </h2>
          <p className="text-sm text-[#94A3B8] mb-6">I tuoi dati personali</p>

          {/* USER INFO */}
          <div className="space-y-3">
            <p className="text-[#E2E8F0]">
              <span className="font-semibold">Username: </span>@{user.username}
            </p>

            <p className="text-[#E2E8F0]">
              <span className="font-semibold">Email: </span>{user.email}
            </p>

            <p className="text-[#E2E8F0]">
              <span className="font-semibold">Bibliografia/Bio: </span>
              <span className="italic text-[#94A3B8]">
                Nessuna bio aggiunta.
              </span>{" "}
              <a
                href="#"
                className="text-[#3B82F6] hover:underline font-medium"
              >
                Aggiungine una!
              </a>
            </p>
          </div>

          {/* BOTTONI */}
          <div className="mt-8 flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3.5 rounded-full font-medium text-[15px] transition">
              <Pencil size={18} />
              Modifica profilo
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white py-3.5 rounded-full font-medium text-[15px] transition">
              <LogOut size={18} />
              Esci dall'account
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex justify-around text-[#64748B] border-b border-[#1E293B] pb-4 mb-10 text-[15px]">
          <span className="cursor-pointer hover:text-white">Post (0)</span>
          <span className="cursor-pointer hover:text-white">Commenti (0)</span>
          <span className="cursor-pointer hover:text-white">Mi piace (0)</span>
        </div>

        {/* MESSAGGIO SE VUOTO */}
        <p className="text-center text-[#94A3B8] text-[15px]">
          Non hai ancora pubblicato post.
        </p>
      </div>
    </AppShell>
  );
}