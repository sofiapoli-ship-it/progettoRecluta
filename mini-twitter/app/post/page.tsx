"use client";

import { AppShell } from "@/components/organisms/app-shell";
import { useState } from "react";

export default function CreatePostPage() {
  const [text, setText] = useState("");

  return (
    <AppShell active="home" title="Crea un nuovo post">
      <p className="text-neutral-400 mb-6">
        Condividi i tuoi pensieri con la community
      </p>

      <div className="bg-[#0F1629] border border-[#1e2537] rounded-xl p-6 max-w-2xl mx-auto">
        {/* TEXTAREA */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cosa stai pensando?"
          className="
            w-full h-40 bg-transparent resize-none outline-none
            text-neutral-200 placeholder-neutral-500
          "
        />

        {/* INFO */}
        <p className="text-neutral-500 text-sm mt-2">
          Supporta Markdown: <b>**grassetto**</b>, <i>_corsivo_</i>, liste, ecc.
        </p>

        {/* BUTTON */}
        <div className="flex justify-end mt-6">
          <button
            className="
              bg-[#3B82F6] hover:bg-[#2563EB] transition
              text-white font-semibold px-6 py-2 rounded-full
            "
          >
            Pubblica
          </button>
        </div>
      </div>
    </AppShell>
  );
}