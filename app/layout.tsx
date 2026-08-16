import "./globals.css";
import { crashFont } from "@/lib/fonts";
import type { Metadata, Viewport } from "next";

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
      </body>
    </html>
  );
}
