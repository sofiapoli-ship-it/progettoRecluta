"use client";

import { useState } from "react";
import { AppShell } from "@/components/organisms/app-shell";

export default function EditProfilePage() {
  const [username, setUsername] = useState("sofia");
  const [bio, setBio] = useState("");

  return (
    <AppShell active="profile" title="Modifica profilo">
      <div className="bg-[#0F1629] border border-[#1f273a] rounded-xl p-8 max-w-xl mx-auto">
        
        {/* USERNAME */}
        <label className="text-sm font-medium text-neutral-300">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            w-full mt-1 mb-6 bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none
            focus:border-blue-500
          "
        />

        {/* BIO */}
        <label className="text-sm font-medium text-neutral-300">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Scrivi qualcosa su di te..."
          className="
            w-full h-32 mt-1 bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none resize-none
            placeholder-neutral-500 focus:border-blue-500
          "
        />

        {/* BUTTONS */}
        <div className="flex gap-3 justify-end mt-8">
          <button
            className="
              bg-[#3B82F6] hover:bg-[#2563EB] px-6 py-2
              rounded-full text-white font-medium transition
            "
          >
            Salva
          </button>

          <button
            className="
              bg-[#374151] hover:bg-[#4B5563] px-6 py-2
              rounded-full text-white font-medium transition
            "
          >
            Annulla
          </button>
        </div>
      </div>
    </AppShell>
  );
}