import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fomentoria — Fundação local",
  description: "Marco técnico do Bloco A. Produto ainda não disponível.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
