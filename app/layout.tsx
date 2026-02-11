import "./globals.css";
import { crashFont } from "@/lib/fonts";
import type { Metadata } from "next";

import BackgroundAudio from "@/components/game/BackgroundAudio";

export const metadata: Metadata = {
  title: "Learn Malay",
  description: "Crash-inspired Malay learning app",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${crashFont.variable} antialiased`}>
        <BackgroundAudio src="/assets/audio/bgm.mp3" />
        {children}
      </body>
    </html>
  );
}
