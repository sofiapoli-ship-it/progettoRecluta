"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiVerifyOtp } from "@/lib/api";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify() {
    setError("");
    setLoading(true);

    try {
      const tempToken = localStorage.getItem("tempToken");

      if (!tempToken) {
        setError("Token temporaneo mancante. Effettua nuovamente il login.");
        return;
      }

      // Chiamata API
      const response = await apiVerifyOtp(tempToken, otp);

      const accessToken = response.accessToken;

      // Salva token definitivo
      localStorage.setItem("accessToken", accessToken);

      // Reindirizza alla home
      router.push("/");
    } catch (err) {
      setError("OTP non valido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-neutral-900 border-neutral-800">
        <CardContent className="p-6 space-y-6">
          
          <h1 className="text-2xl font-bold text-center mb-4">
            Verifica codice OTP
          </h1>

          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            className="bg-neutral-800 border-neutral-700 text-white text-center text-xl tracking-widest"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <Button className="w-full" onClick={handleVerify} disabled={loading}>
            {loading ? "Verificando..." : "Verifica"}
          </Button>

        </CardContent>
      </Card>
    </main>
  );
}