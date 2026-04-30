import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qurbani Share - Ethical Cattle Sharing",
  description: "Modern Islamic Qurbani Cow Sharing E-commerce Platform",
};

import { PlatformProvider } from "@/context/PlatformContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <PlatformProvider>
          <Navbar />
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </PlatformProvider>
      </body>
    </html>
  );
}
