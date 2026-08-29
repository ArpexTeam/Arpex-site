import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arpex-site.vercel.app"),
  title: {
    default: "ArpeX Technology | Sua empresa já tem um sistema. Ele só está espalhado.",
    template: "%s | ArpeX Technology",
  },
  description:
    "A ArpeX transforma processos improvisados em sistemas, automações e experiências digitais que dão clareza para crescer.",
  applicationName: "ArpeX Technology",
  keywords: [
    "ArpeX",
    "sistemas sob medida",
    "automação de processos",
    "aplicativos personalizados",
    "experiências digitais",
    "estruturação digital",
    "software sob medida",
  ],
  authors: [{ name: "ArpeX Technology" }],
  openGraph: {
    title: "ArpeX Technology | Sua empresa já tem um sistema. Ele só está espalhado.",
    description:
      "A ArpeX transforma processos improvisados em sistemas, automações e experiências digitais que dão clareza para crescer.",
    url: "/",
    siteName: "ArpeX Technology",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArpeX Technology | Sua empresa já tem um sistema. Ele só está espalhado.",
    description:
      "A ArpeX transforma processos improvisados em sistemas, automações e experiências digitais que dão clareza para crescer.",
  },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className="bg-ink text-ivory"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased selection:bg-system/30`}
      >
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
