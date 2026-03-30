import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navmenu from "@/components/navmenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arpex.example"),
  title: {
    default: "ArpeX | Fábrica de software sob medida",
    template: "%s | ArpeX",
  },
  description:
    "Software sob medida, automações, aplicativos, soluções operacionais e experiências digitais para empresas em crescimento.",
  applicationName: "ArpeX",
  keywords: [
    "ArpeX",
    "fábrica de software",
    "software sob medida",
    "automação de processos",
    "aplicativos personalizados",
    "sistemas para operação",
  ],
  authors: [{ name: "ArpeX" }],
  openGraph: {
    title: "ArpeX | Fábrica de software sob medida",
    description:
      "A ArpeX desenha e desenvolve sistemas, automações, apps e soluções digitais aderentes ao contexto real do negócio.",
    url: "/",
    siteName: "ArpeX",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ArpeX" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArpeX | Fábrica de software sob medida",
    description:
      "Software sob medida para operação, automação, apps e crescimento com mais clareza.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#00CF77",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-bg text-zinc-100" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased selection:bg-brand/30`}
      >
        <Navmenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
