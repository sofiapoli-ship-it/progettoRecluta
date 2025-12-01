"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] px-4">
      <div className="bg-[#0F1629] border border-[#1f273a] rounded-xl p-8 w-full max-w-md text-white">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-center mb-6">MiniTwitter</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-1">Crea un nuovo account</h2>
        <p className="text-neutral-400 mb-6 text-sm">
          Registrati per iniziare a usare la piattaforma.
        </p>

        {/* USERNAME */}
        <label className="text-sm font-medium text-neutral-300">Username</label>
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

        {/* EMAIL */}
        <label className="text-sm font-medium text-neutral-300">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full mt-1 mb-5 bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none
            focus:border-blue-500
          "
          type="email"
          placeholder="email@example.com"
        />

        {/* PASSWORD */}
        <label className="text-sm font-medium text-neutral-300">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full mt-1 mb-5 bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none
            focus:border-blue-500
          "
          type="password"
          placeholder="••••••••"
        />

        {/* CONFIRM PASSWORD */}
        <label className="text-sm font-medium text-neutral-300">Conferma password</label>
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="
            w-full mt-1 mb-6 bg-[#111827] border border-[#1e2537]
            rounded-lg px-3 py-2 text-neutral-200 outline-none
            focus:border-blue-500
          "
          type="password"
          placeholder="••••••••"
        />

        {/* BUTTON */}
        <button
          className="
            w-full bg-[#3B82F6] hover:bg-[#2563EB] transition
            text-white font-semibold py-2 rounded-full
          "
        >
          Registrati
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-neutral-400 mt-6 text-center">
          Hai già un account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}