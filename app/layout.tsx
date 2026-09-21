import "./globals.css";
import { crashFont } from "@/lib/fonts";
import type { Metadata, Viewport } from "next";
import Link from "next/link";

import BackgroundAudio from "@/components/game/BackgroundAudio";
import AddToHomeScreenPrompt from "@/components/game/AddToHomeScreenPrompt";

export const metadata: Metadata = {
  applicationName: "Learn Malay",
  title: "Learn Malay",
  description: "Playful game-style app for learning spoken Malaysian Malay",
  appleWebApp: {
    capable: true,
    title: "Learn Malay",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${crashFont.variable} antialiased`}>
        <BackgroundAudio showControls={false} />
        <AddToHomeScreenPrompt />
        {children}
        <footer className="relative z-40 border-t border-[#d7b45c]/25 bg-[#0a2014] px-4 py-3 text-center text-xs font-bold text-[#f8efcb]/85">
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center rounded-xl px-4 underline decoration-[#d7b45c]/75 decoration-2 underline-offset-4 transition hover:bg-white/10 hover:text-[#fff7d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0cc65]"
          >
            Notis Privasi / Privacy Notice
          </Link>
        </footer>
      </body>
    </html>
  );
}
