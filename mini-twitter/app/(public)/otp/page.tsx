"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/lib/api/auth/verify-otp";

export default function OtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Recuperiamo il token temporaneo salvato dal login (fase 1)
    const temp_token = localStorage.getItem("temp_token");

    if (!temp_token) {
      setError("Token temporaneo mancante. Effettua di nuovo il login.");
      return;
    }

    try {
      const result = await verifyOtp(temp_token, otp);

      console.log("VERIFY OTP RESULT:", result);

      // ❌ OTP errato
      if (!result || !result.success || !result.token) {
        setError("OTP non valido.");
        return;
      }

      // 🔥 Salviamo il token finale JWT
      localStorage.setItem("token", result.token);

      // 🔥 Rimuoviamo il token temporaneo
      localStorage.removeItem("temp_token");

      // 👉 Reindirizzamento all'area privata
      router.push("/home");

    } catch (err: any) {
      console.error("OTP verify error:", err);
      setError("Errore durante la verifica OTP.");
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#030616] justify-center items-center">

      <div className="flex justify-center items-center md:w-1/2 p-10 mx-auto">
        <div className="bg-[#0E1424] border border-white/10 rounded-2xl 
                        p-12 w-full max-w-[480px] shadow-[0_0_40px_rgba(0,0,0,0.35)]">

          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Verifica OTP
          </h2>

          <p className="text-white/60 text-center mb-10 text-sm">
            Inserisci il codice a 6 cifre da Google Authenticator
          </p>

          {error && (
            <p className="text-red-400 font-medium text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleVerify} className="flex flex-col gap-6">

            {/* INPUT OTP */}
            <div>
              <label className="text-white text-sm">Codice OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 w-full bg-[#030616] border border-white/10 
                           text-white p-4 rounded-xl text-center tracking-widest 
                           placeholder-white/40 text-lg focus:outline-none
                           focus:border-[#4B83FF] transition-all"
                placeholder="123456"
                required
              />
            </div>

            {/* BOTTONE VERIFICA */}
            <button
              type="submit"
              className="mt-2 bg-[#217FE9] hover:bg-[#3a6fe0] transition 
                         text-white font-semibold text-lg py-4 rounded-full 
                         shadow-lg shadow-blue-500/10"
            >
              Verifica e Accedi
            </button>

            {/* TORNA INDIETRO */}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="bg-[#0E1424] hover:bg-[#151d2c] transition 
                         text-white/80 text-lg py-3 rounded-full"
            >
              Torna indietro
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}