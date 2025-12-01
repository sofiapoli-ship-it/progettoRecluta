"use client";

import { useState } from "react";
import { AppShell } from "@/components/organisms/app-shell";

export default function CreatePostPage() {
  const [content, setContent] = useState("");

  return (
    <AppShell active="home" title="Crea un nuovo post">
      <div className="max-w-[650px] mx-auto mt-6">

        {/* Subtitle */}
        <p className="text-neutral-400 mb-6">
          Condividi i tuoi pensieri con la community
        </p>

        {/* Post box container */}
        <div className="bg-[#0b1120] border border-[#1f2937] rounded-xl p-6">
          
          {/* Textarea */}
          <textarea
            className="
              w-full h-[160px] bg-transparent resize-none outline-none
              text-white placeholder-neutral-500 text-[16px]
            "
            placeholder="Cosa stai pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Markdown help */}
          <p className="text-neutral-500 text-sm mt-1 mb-4">
            Supporta Markdown: <b>**grassetto**</b>, <i>_corsivo_</i>, liste, ecc.
          </p>

          {/* Publish button */}
          <div className="flex justify-end">
            <button
              disabled={content.trim().length === 0}
              className="
                px-5 py-2 rounded-lg 
                bg-blue-600 text-white font-medium 
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              Pubblica
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}