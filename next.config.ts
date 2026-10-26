import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A camada de domínio ainda não existe; não abrir rotas administrativas no Bloco A.
};

export default nextConfig;
