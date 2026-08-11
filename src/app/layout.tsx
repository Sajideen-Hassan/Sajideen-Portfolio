import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sajideen Hassan | Associate Software Engineer",
  description:
    "Portfolio of Sajideen Hassan, an associate software engineer. Builds web applications with MERN, PERN, and Python, and helps teams turn client requirements into delivered software.",
  authors: [{ name: "Sajideen Hassan" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} antialiased dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-text-primary antialiased selection:bg-[#ccff00] selection:text-black">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
