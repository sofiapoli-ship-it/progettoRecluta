"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiLogin } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const response = await apiLogin(username, password);
      const tempToken = response.temporaryToken;

      // salva token temporaneo
      localStorage.setItem("tempToken", tempToken);

      // vai alla pagina OTP
      router.push("/verify");
    } catch (err) {
      setError("Credenziali non valide");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-neutral-900 border-neutral-800">
        <CardContent className="p-6 space-y-6">
          
          <h1 className="text-2xl font-bold text-center mb-4">Accedi</h1>

          <div className="space-y-4">
            <Input 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white"
            />

            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <Button 
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Attendere..." : "Continua"}
          </Button>

          <p className="text-sm text-neutral-400 text-center pt-2">
            Non hai un account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Registrati
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}