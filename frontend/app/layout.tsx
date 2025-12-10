
import "./globals.css";
import { AuthProvider } from "@/contexts/auth";

export const metadata = {
  title: "MiniTwitter",
  description: "Progetto tipo Twitter — Sof",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}