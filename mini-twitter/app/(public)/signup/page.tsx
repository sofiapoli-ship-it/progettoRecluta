"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="bg-[#0A0F1C] border border-[#1E2535]
                    rounded-2xl w-[500px] px-10 py-12 shadow-lg">

      {/* Titolo */}
      <h1 className="text-center text-3xl font-bold mb-2">Crea un account</h1>
      <p className="text-center text-[#A2ABB3] mb-10">
        Inserisci i tuoi dati per registrarti
      </p>

      {/* FORM */}
      <form className="flex flex-col gap-6">

        {/* USERNAME */}
        <div>
          <label className="block mb-1 text-sm text-[#A2ABB3]">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0F172A]
                       border border-[#1E2535] focus:outline-none 
                       focus:border-[#1DA1F2] text-white"
            placeholder="username"
          />
        </div>

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

        {/* CONFERMA PASSWORD */}
        <div>
          <label className="block mb-1 text-sm text-[#A2ABB3]">Conferma password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0F172A]
                       border border-[#1E2535] focus:outline-none 
                       focus:border-[#1DA1F2] text-white"
            placeholder="********"
          />
        </div>

        {/* BOTTONE */}
        <button
          type="submit"
          className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8]
                     transition text-white font-semibold
                     py-3 rounded-full mt-4"
        >
          Crea account
        </button>
      </form>

      {/* LINK LOGIN */}
      <p className="text-center text-[#A2ABB3] mt-6">
        Hai già un account?{" "}
        <Link href="/login" className="text-[#4B83FF]">
          Accedi
        </Link>
      </p>
    </div>
  );
}