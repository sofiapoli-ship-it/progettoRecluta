import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-neutral-900 border-neutral-800">
        <CardContent className="p-6 space-y-6">
          
          <h1 className="text-2xl font-bold text-center mb-4">Crea un account</h1>
          
          <div className="space-y-4">
            <Input 
              placeholder="Username"
              className="bg-neutral-800 border-neutral-700 text-white"
            />
            <Input 
              type="email"
              placeholder="Email"
              className="bg-neutral-800 border-neutral-700 text-white"
            />
            <Input 
              type="password"
              placeholder="Password"
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>
          
          <Button className="w-full">
            Registrati
          </Button>

          <p className="text-sm text-neutral-400 text-center pt-2">
            Hai già un account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Accedi
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}