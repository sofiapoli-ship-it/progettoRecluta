import { AppShell } from "@/components/organisms/app-shell";

export default function LikesPage() {
  return (
    <AppShell active="likes" title="I tuoi Mi Piace">
      <div className="flex flex-col items-center justify-center text-center py-20">

        <p className="text-neutral-400 text-lg mb-2">
          Ancora nessun like ricevuto
        </p>

        <p className="text-neutral-600 text-sm">
          I like che ricevi ai tuoi post appariranno qui.
        </p>
        
      </div>
    </AppShell>
  );
}