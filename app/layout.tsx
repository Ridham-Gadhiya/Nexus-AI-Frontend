import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google"; // Importing premium google fonts
import "./globals.css";
import { Header } from "./components/core/Header";
import { Footer } from "./components/core/Footer";

// Setup Fonts
const outfit = Outfit({ subsets: ["latin"], variable: '--font-heading' });
const inter = Inter({ subsets: ["latin"], variable: '--font-body' });

export const metadata: Metadata = {
  title: "Nexus AI Labs | Future of Intelligence",
  description: "World-Class AI & Web Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} font-body bg-[#0A0A10] text-white antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}