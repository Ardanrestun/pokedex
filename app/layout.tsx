import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PokemonProvider } from "./context/PokemonContext";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokeDex - Pokemon Encyclopedia",
  description: "A responsive Pokemon encyclopedia app built with Next.js by Ardan Restu Nugroho",
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PokemonProvider>
          <Navbar />
          <main className="pt-0 md:pt-16 pb-16 md:pb-0 min-h-screen">
            {children}
          </main>
        </PokemonProvider>
      </body>
    </html>
  );
}
