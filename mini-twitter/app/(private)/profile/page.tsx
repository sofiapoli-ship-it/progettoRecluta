"use client";

import { AppShell } from "@/components/organisms/app-shell";

const mockMyUser = {
  username: "sofia",
  email: "sofia@poli.com",
  bio: "",
  createdAt: "2024-09-10T00:00:00Z",
};

export default function ProfilePage() {
  const user = mockMyUser;

  return (
    <AppShell active="profile" title="Profilo">
      <div className="max-w-[750px] mx-auto px-4">

        {/* ==== CARD PROFILO ==== */}
        <div className="
          bg-[#0B0F1A]
          border border-[#1C2333]
          rounded-2xl
          px-8 py-10
          shadow-[0_0_30px_rgba(0,0,0,0.25)]
        ">
          <h2 className="text-[22px] font-semibold text-white">
            Informazioni utente
          </h2>

          <p className="text-[14px] text-neutral-400 mt-1 mb-8">
            I tuoi dati personali
          </p>

          <div className="space-y-6 text-[15px]">
            
            {/* Username */}
            <div className="flex flex-col gap-1">
              <span className="text-neutral-400 text-[14px]">Username</span>
              <span className="text-neutral-100 font-medium text-[16px]">
                @{user.username}
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="text-neutral-400 text-[14px]">Email</span>
              <span className="text-neutral-100 font-medium text-[16px]">
                {user.email}
              </span>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
              <span className="text-neutral-400 text-[14px]">Bibliografia/Bio</span>

              {user.bio ? (
                <span className="text-neutral-100">{user.bio}</span>
              ) : (
                <span className="text-neutral-500 italic">
                  Nessuna bio aggiunta.{" "}
                  <span className="text-[#3B82F6] hover:underline cursor-pointer not-italic">
                    Aggiungine una!
                  </span>
                </span>
              )}
            </div>

          </div>

          {/* BOTTONI */}
          <div className="flex flex-col gap-4 mt-10">

            <button className="
              w-full
              py-3.5
              rounded-full
              bg-[#3B82F6]
              hover:bg-[#2F6ADF]
              text-white
              text-[15px]
              font-medium
              transition
            ">
              ✏️ Modifica profilo
            </button>

            <button className="
              w-full
              py-3.5
              rounded-full
              bg-[#B91C1C]
              hover:bg-[#991B1B]
              text-white
              text-[15px]
              font-medium
              transition
            ">
              ↪️ Esci dall'account
            </button>

          </div>
        </div>

        {/* ==== TABS ==== */}
        <div className="
          flex items-center gap-12
          border-b border-[#1C2333]
          mt-12
          pb-3
          text-[15px]
        ">
          <button className="text-blue-400 font-semibold border-b-2 border-blue-500 pb-3">
            Post (0)
          </button>

          <button className="text-neutral-400 hover:text-neutral-300 transition pb-3">
            Commenti (0)
          </button>

          <button className="text-neutral-400 hover:text-neutral-300 transition pb-3">
            Mi piace (1)
          </button>
        </div>

        <p className="text-center text-neutral-500 mt-12 text-[15px]">
          Non hai ancora pubblicato post.
        </p>

      </div>
    </AppShell>
  );
}