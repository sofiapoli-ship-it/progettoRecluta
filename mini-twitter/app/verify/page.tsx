import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-neutral-900 border-neutral-800">
        <CardContent className="p-6 space-y-6">
          
          <h1 className="text-2xl font-bold text-center mb-4">
            Verifica codice OTP
          </h1>

          <p className="text-neutral-400 text-sm text-center">
            Inserisci il codice ricevuto via email per completare l’accesso.
          </p>
          
          <Input 
            placeholder="000000"
            className="bg-neutral-800 border-neutral-700 text-white text-center text-xl tracking-widest"
          />

          <Button className="w-full">
            Verifica
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}