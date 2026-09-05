import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplatLabs — Live Events in 4D Gaussian Splatting",
  description:
    "Stream immersive, photorealistic volumetric experiences of live events. Real-time 4D Gaussian Splatting streaming, built for the browser.",
  keywords: [
    "4D Gaussian Splatting",
    "Volumetric Streaming",
    "Live Events",
    "Immersive Video",
    "WebGPU",
    "SplatLabs",
  ],
  openGraph: {
    title: "SplatLabs — Live Events in 4D Gaussian Splatting",
    description:
      "Stream immersive, photorealistic volumetric experiences of live events. Real-time 4D Gaussian Splatting streaming, built for the browser.",
    type: "website",
    locale: "en_US",
    siteName: "SplatLabs",
  },
  twitter: {
    card: "summary_large_image",
    title: "SplatLabs — Live Events in 4D Gaussian Splatting",
    description:
      "Stream immersive, photorealistic volumetric experiences of live events.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}