import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/contatos", destination: "/contato", permanent: true },
      { source: "/servicos", destination: "/solucoes", permanent: true },
    ];
  },
};

export default nextConfig;
