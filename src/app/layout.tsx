import type { Metadata, Viewport } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SITE_URL } from "@/data/social-links";

// Títulos e rótulos: Manrope. Leitura: Source Sans 3. Um arquivo variável
// por família (só latin, sem itálico); o eixo de peso contínuo da Manrope
// também alimenta a resposta ao ponteiro do encerramento.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "ArpeX Technology | Estruturação digital sob medida";
const description =
  "Sites, automações e sistemas sob medida para micro, pequenas e médias empresas organizarem a presença digital, o atendimento e os processos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | ArpeX Technology" },
  description,
  applicationName: "ArpeX Technology",
  keywords: [
    "ArpeX",
    "estruturação digital",
    "criação de sites",
    "sistemas sob medida",
    "automação de tarefas",
    "pequenas e médias empresas",
    "Perfil da Empresa no Google",
    "placa de avaliação NFC",
    "QR Code",
  ],
  authors: [{ name: "ArpeX Technology" }],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "ArpeX Technology",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0e0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#conteudo"
          className="btn btn-primary btn-sm sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-3 focus-visible:z-[100] focus-visible:px-5"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Header />
          <div id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
