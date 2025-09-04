// app/layout.tsx
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
  metadataBase: new URL("https://arpex.example"), // ajuste para seu domínio
  title: {
    default: "ArpeX — Desenvolvimento de Sites",
    template: "%s | ArpeX",
  },
  description: "Sites sob medida para sua empresa.",
  applicationName: "ArpeX",
  keywords: ["ArpeX", "desenvolvimento de sites", "Next.js", "agência", "landing page"],
  authors: [{ name: "ArpeX" }],
  openGraph: {
    title: "ArpeX — Desenvolvimento de Sites",
    description: "Sites sob medida para sua empresa.",
    url: "/",
    siteName: "ArpeX",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ArpeX" }], // coloque /public/og.jpg
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArpeX — Desenvolvimento de Sites",
    description: "Sites sob medida para sua empresa.",
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
    <html
      lang="pt-BR"
      className="bg-bg text-zinc-100"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh selection:bg-brand/30`}
      >
        <Navmenu/>
        {children}
              <Footer />

      </body>
    </html>
  );
}
