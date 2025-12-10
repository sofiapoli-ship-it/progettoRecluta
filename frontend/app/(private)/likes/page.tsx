"use client";

import { AppShell } from "@/components/organisms/app-shell";

export default function LikesPage() {
  return (
    <AppShell active="likes" title="I tuoi Mi piace">
      <div className="flex flex-col items-center justify-center mt-20 text-center">

        <p className="text-white text-lg ">
          Ancora nessun like ricevuto
        </p>

        <p className="text-neutral-400 mt-2">
          I like che ricevi ai tuoi post appariranno qui.
        </p>

      </div>
    </AppShell>
  );
}