"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { otpSetup } from "@/lib/api/auth/otp/setup";

export default function OtpSetupPage() {
  const router = useRouter();

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQr() {
      const tempToken = localStorage.getItem("temp_token");

      if (!tempToken) {
        setError("Token temporaneo mancante. Effettua di nuovo il login.");
        return;
      }

      const data = await otpSetup(tempToken);

      if (!data || !data.otpauth_url) {
        setError("Errore durante il setup OTP.");
        return;
      }

      // Il QR lo generiamo usando Google API charts
      const qr = `https://chart.googleapis.com/chart?cht=qr&chs=240x240&chl=${encodeURIComponent(
        data.otpauth_url
      )}`;

      setQrCode(qr);
      setSecret(data.secret);
    }

    loadQr();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#030616] justify-center items-center">

      <div className="flex justify-center items-center md:w-1/2 p-10 mx-auto">
        <div className="bg-[#0E1424] border border-white/10 rounded-2xl 
                        p-12 w-full max-w-[480px] shadow-[0_0_40px_rgba(0,0,0,0.35)]">

          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Configura Google Authenticator
          </h2>

          <p className="text-white/60 text-center mb-10 text-sm">
            Scansiona il QR Code con Google Authenticator oppure inserisci il codice manuale.
          </p>

          {error && (
            <p className="text-red-400 font-medium text-center mb-4">{error}</p>
          )}

          {/* QR CODE */}
          {qrCode && (
            <div className="flex justify-center mb-6">
              <img
                src={qrCode}
                alt="OTP QR Code"
                className="rounded-lg border border-white/10 shadow-md"
              />
            </div>
          )}

          {/* SECRET CODE */}
          {secret && (
            <div className="flex flex-col items-center text-white mb-8">
              <p className="text-sm text-neutral-400 mb-1">Codice OTP (manuale):</p>
              <p className="font-mono text-lg bg-[#030616] px-4 py-2 rounded-lg border border-white/10">
                {secret}
              </p>
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={() => router.push("/otp")}
            className="mt-2 w-full bg-[#217FE9] hover:bg-[#3a6fe0] transition
                        text-white font-semibold text-lg py-4 rounded-full
                        shadow-lg shadow-blue-500/10"
            >
            Ho configurato l’app — Continua
        </button>

          <button
            onClick={() => router.push("/login")}
            className="mt-4 w-full bg-[#0E1424] hover:bg-[#151d2c] transition 
                       text-white/80 text-lg py-3 rounded-full"
          >
            Torna indietro
          </button>
        </div>
      </div>
    </div>
  );
}