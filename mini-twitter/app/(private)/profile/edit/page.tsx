"use client";

import { useState } from "react";
import { AppShell } from "@/components/organisms/app-shell";

export default function EditProfilePage() {

  // Mock dati esistenti
  const [username, setUsername] = useState("sofia");
  const [email, setEmail] = useState("sofia@poli.com");
  const [bio, setBio] = useState("");

  const handleSave = () => {
    alert("Modifiche salvate (mock) ✨");
  };

  return (
    <AppShell active="profile" title="Modifica profilo">
      <div className="bg-[#0D1220] border border-[#1f2937] rounded-xl p-6 max-w-[650px] mx-auto">

        <h2 className="text-xl font-semibold mb-6 text-white">Modifica profilo</h2>

        {/* USERNAME */}
        <label className="text-gray-300 text-sm">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-[#111827] border border-[#1f2937] text-white rounded-lg px-3 py-2 mt-1 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* EMAIL */}
        <label className="text-gray-300 text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#111827] border border-[#1f2937] text-white rounded-lg px-3 py-2 mt-1 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* BIO */}
        <label className="text-gray-300 text-sm">Biografia</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full bg-[#111827] border border-[#1f2937] text-white rounded-lg px-3 py-2 mt-1 mb-6 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Scrivi qualcosa su di te..."
        ></textarea>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => history.back()}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
          >
            Annulla
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
          >
            Salva modifiche
          </button>
        </div>

      </div>
    </AppShell>
  );
}