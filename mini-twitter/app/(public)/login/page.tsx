"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] px-4">
      <div className="bg-[#0F1629] border border-[#1f273a] rounded-xl p-8 w-full max-w-md text-white">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-center mb-6">MiniTwitter</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-1">Accedi al tuo account</h2>
        <p className="text-neutral-400 mb-6 text-sm">
          Inserisci le tue credenziali per continuare.
        </p>

        {/* Username */}
        <label className="text-sm font-medium text-neutral-300">
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            w-full mt-1 mb-5 bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none
            focus:border-blue-500
          "
          type="text"
          placeholder="Il tuo username"
        />

        {/* Password */}
        <label className="text-sm font-medium text-neutral-300">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full mt-1 mb-6 bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none
            focus:border-blue-500
          "
          type="password"
          placeholder="••••••••"
        />

        {/* Button */}
        <button
          className="
            w-full bg-[#3B82F6] hover:bg-[#2563EB] transition
            text-white font-semibold py-2 rounded-full
          "
        >
          Continua
        </button>

        {/* Signup Link */}
        <p className="text-sm text-neutral-400 mt-6 text-center">
          Non hai un account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}