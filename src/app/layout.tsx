import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fomentoria — Onde a inovação encontra recurso",
  description: "Fomentoria: um novo jeito de descobrir editais, programas e oportunidades de fomento no Brasil. Plataforma em desenvolvimento.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
