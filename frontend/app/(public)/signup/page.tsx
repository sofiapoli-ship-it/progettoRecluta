"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/api/auth/register";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (password !== confirm) {
    setError("Le password non coincidono.");
    return;
  }

  try {
    const result = await register(username, email, password);

    if (!result || !result.user) {
      setError("Registrazione fallita.");
      return;
    }

    router.push("/login");

  } catch (err: any) {
    console.error("Signup error:", err);
    setError(err.message || "Errore durante la registrazione.");
  }
}

  return (
    <div className="flex w-full min-h-screen">

      {/* COLONNA CENTRALE – FORM */}
      <div className="flex flex-1 justify-center items-center px-6 md:px-20">
        <div className="bg-[#0E1424] w-full max-w-md p-10 rounded-2xl border border-white/10 shadow-xl">

          <h2 className="text-3xl font-bold text-white mb-2">Crea un account</h2>
          <p className="text-white/60 mb-8">Inserisci i tuoi dati per registrarti</p>

          {error && (
            <p className="text-red-400 mb-4 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className="text-white text-sm">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full bg-[#030616] border border-white/10 text-white p-3 rounded-lg"
                placeholder="username"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-[#030616] border border-white/10 text-white p-3 rounded-lg"
                placeholder="nome@esempio.com"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-[#030616] border border-white/10 text-white p-3 rounded-lg"
                placeholder="********"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Conferma Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full bg-[#030616] border border-white/10 text-white p-3 rounded-lg"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-[#217FE9] hover:bg-[#3a6fe0] transition text-white font-semibold text-lg py-3 rounded-full"
            >
              Crea account
            </button>

          </form>

          <p className="text-center text-white/60 text-sm mt-4">
            Hai già un account?{" "}
            <Link href="/login" className="text-[#4B83FF] hover:underline">Accedi</Link>
          </p>

        </div>
      </div>

    </div>
  );
}