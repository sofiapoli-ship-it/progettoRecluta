"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-[#0A0F1C] border border-[#1E2535]
                    rounded-2xl w-[500px] px-10 py-12 shadow-lg">

      {/* Titolo */}
      <h1 className="text-center text-3xl font-bold mb-2">
        Accedi
      </h1>
      <p className="text-center text-[#A2ABB3] mb-10">
        Inserisci le tue credenziali per continuare
      </p>

      {/* FORM */}
      <form className="flex flex-col gap-6">

        {/* EMAIL */}
        <div>
          <label className="block mb-1 text-sm text-[#A2ABB3]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0F172A]
                       border border-[#1E2535] focus:outline-none 
                       focus:border-[#1DA1F2] text-white"
            placeholder="nome@esempio.com"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block mb-1 text-sm text-[#A2ABB3]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0F172A]
                       border border-[#1E2535] focus:outline-none 
                       focus:border-[#1DA1F2] text-white"
            placeholder="********"
          />
        </div>

        {/* BOTTONE LOGIN */}
        <button
          type="submit"
          className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8]
                     transition text-white font-semibold
                     py-3 rounded-full mt-4"
        >
          Accedi
        </button>
      </form>

      {/* LINK A SIGNUP */}
      <p className="text-center text-[#A2ABB3] mt-6">
        Non hai un account?{" "}
        <Link href="/signup" className="text-[#4B83FF]">
          Registrati
        </Link>
      </p>
    </div>
  );
}