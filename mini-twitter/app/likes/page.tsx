import { AppShell } from "@/components/organisms/app-shell";

export default function LikesPage() {
  return (
    <AppShell active="likes" title="I tuoi Mi piace">

      <div className="max-w-2xl mx-auto text-center mt-16">
        <h2 className="text-xl font-semibold text-white mb-2">
          Ancora nessun like ricevuto
        </h2>
        <p className="text-neutral-400">
          I like che ricevi ai tuoi post appariranno qui.
        </p>
      </div>

    </AppShell>
  );
}