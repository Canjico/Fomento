import type { Metadata } from "next";
import { Anek_Tamil } from "next/font/google";
import "./globals.css";

const anekTamil = Anek_Tamil({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-anek-tamil",
});

export const metadata: Metadata = {
  title: "Fomentoria — Onde a inovação encontra recurso",
  description: "Fundação visual do portal Fomentoria. Catálogo e inscrições ainda indisponíveis.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={anekTamil.variable}>{children}</body>
    </html>
  );
}
