"use client";

import { useState, useEffect } from "react";
import { loginStep2 } from "@/lib/api";

export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("tempToken");
    if (!token) {
      window.location.href = "/login";
    }
    setTempToken(token);
  }, []);

  if (!tempToken) return null;

  async function handleVerify() {
    try {
      const data = await loginStep2(otp, tempToken!);

      // Salva token definitivo
      localStorage.setItem("token", data.token);

      // Rimuovi tempToken
      localStorage.removeItem("tempToken");

      // Redirect alla home
      window.location.href = "/";
    } catch (err) {
      alert("OTP non valido");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] px-4">
      <div className="bg-[#0F1629] border border-[#1f273a] rounded-xl p-8 w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center mb-6">MiniTwitter</h1>

        <h2 className="text-2xl font-semibold mb-2">Inserisci il codice OTP</h2>
        <p className="text-neutral-400 text-sm mb-6">
          Abbiamo inviato un codice alla tua email.
        </p>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="
            w-full bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none
            focus:border-blue-500 mb-6
          "
          placeholder="123456"
        />

        <button
          onClick={handleVerify}
          className="
            w-full bg-[#3B82F6] hover:bg-[#2563EB] transition
            text-white font-semibold py-2 rounded-full
          "
        >
          Verifica OTP
        </button>
      </div>
    </div>
  );
}