"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginStep2 } from "@/lib/api";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function handleVerify(e: any) {
    e.preventDefault();
    setError("");

    try {
      // Recupero token temporaneo (messo dopo Login Step 1)
      const tempToken = sessionStorage.getItem("tempToken");

      if (!tempToken) {
        setError("Sessione scaduta. Effettua nuovamente il login.");
        return;
      }

      // Step 2: Invio OTP + tempToken
      const data = await loginStep2(otp, tempToken);

      // Salviamo il token definitivo (per ora senza NextAuth)
      localStorage.setItem("accessToken", data.token);

      // Rimuoviamo token temporaneo
      sessionStorage.removeItem("tempToken");

      // Redirect alla home
      router.push("/");

    } catch (err) {
      setError("OTP non valido. Riprova.");
    }
  }

  return (
    <div className="min-h-screen flex bg-[#050816] text-white">

      {/* ---- LEFT SIDEBAR ---- */}
      <aside className="w-[380px] border-r border-[#111827] px-10 pt-20 flex flex-col">
        <h1 className="text-3xl font-bold mb-10 leading-snug">
          Partecipa alla <br /> conversazione
        </h1>

        <Link
          href="/signup"
          className="bg-[#3B82F6] hover:bg-[#2563EB] transition text-white font-semibold py-3 rounded-full text-center mb-4"
        >
          Crea account
        </Link>

        <Link
          href="/login"
          className="bg-[#1F2937] hover:bg-[#374151] transition text-white font-semibold py-3 rounded-full text-center border border-[#374151]"
        >
          Accedi
        </Link>

        <div className="mt-auto mb-8 text-sm text-[#9CA3AF] space-y-1">
          <Link href="#" className="hover:underline block">
            Termini di servizio
          </Link>
          <Link href="#" className="hover:underline block">
            Informativa sulla privacy
          </Link>
        </div>
      </aside>

      {/* ---- RIGHT FORM ---- */}
      <main className="flex flex-1 justify-center items-center">
        <div className="bg-[#0E1424] border border-[#1F2937] rounded-xl px-10 py-10 w-full max-w-md shadow-lg">

          <h2 className="text-2xl font-bold text-center mb-2">Verifica OTP</h2>
          <p className="text-center text-[#9CA3AF] text-sm mb-8">
            Inserisci il codice OTP da Google Authenticator
          </p>

          {/* FORM */}
          <form onSubmit={handleVerify} className="flex flex-col gap-6">

            {/* OTP INPUT */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#9CA3AF]">Codice OTP</label>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-[#050816] border border-[#1F2937] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-[#9CA3AF]">
                Inserisci il codice a 6 cifre da Google Authenticator
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              className="bg-[#3B82F6] hover:bg-[#2563EB] transition text-white font-semibold py-3 rounded-full"
            >
              Verifica e Accedi
            </button>
          </form>

          {/* BACK LINK */}
          <p className="text-center text-[#9CA3AF] text-sm mt-6">
            <Link href="/login" className="hover:underline">
              Torna indietro
            </Link>
          </p>

        </div>
      </main>
    </div>
  );
}