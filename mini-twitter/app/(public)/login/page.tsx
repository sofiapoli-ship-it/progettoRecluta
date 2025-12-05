"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/lib/api/auth/login";
import { useRouter } from "next/navigation";
import { otpStatus } from "@/lib/api/auth/otp/status";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  try {
    const res = await login(username, password);

    if (!res.success || !res.temp_token) {
      setError("Credenziali non valide.");
      return;
    }

    // Step 1 — salva temp_token
    localStorage.setItem("temp_token", res.temp_token);

    // Step 2 — prova a verificare lo stato OTP
    const status = await otpStatus(res.temp_token);

    // CASO A → il backend risponde 200 → OTP attivo
    if (status && status.enabled === true) {
      router.push("/otp");
      return;
    }

    // CASO B → il backend risponde 200 ma OTP disattivo
    if (status && status.enabled === false) {
      router.push("/otp/setup");
      return;
    }

    // CASO C → status == null → probabilmente 401 → OTP NON ATTIVO
    router.push("/otp/setup");
    return;

  } catch (err) {
    console.error("Login error:", err);
    setError("Errore durante il login.");
  }
}
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* BOX LOGIN */}
      <div className="flex flex-1 justify-center items-center px-6 md:px-20">
        <div className="bg-[#0E1424] border border-[#1F2937] rounded-2xl 
                        p-12 w-full max-w-[480px]">

          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Accedi
          </h2>

          <p className="text-white/60 text-center mb-10 text-sm">
            Inserisci le tue credenziali per accedere
          </p>

          {error && (
            <p className="text-red-400 font-medium text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div>
              <label className="text-white text-sm">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full bg-[#030616] border border-[#1F2937] 
                           text-white p-3 rounded-lg"
                placeholder="username"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full bg-[#030616] border border-[#1F2937] 
                           text-white p-3 rounded-lg"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-[#217FE9] hover:bg-[#1A8CD8] transition 
                         text-white font-semibold text-lg py-3 rounded-full"
            >
              Continua
            </button>
          </form>

          <p className="text-center text-white/60 text-sm mt-6">
            Non hai un account?{" "}
            <Link href="/signup" className="text-[#4B83FF]">Registrati</Link>
          </p>

        </div>
      </div>
    </div>
  );
}