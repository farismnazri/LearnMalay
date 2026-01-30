import "./globals.css";
import { crashFont } from "@/lib/fonts";

import BackgroundAudio from "@/components/game/BackgroundAudio";

export const metadata = {
  title: "Learn Malay",
  description: "Crash-inspired Malay learning app",
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