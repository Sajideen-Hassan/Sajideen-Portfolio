import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sajideen Hassan | Technical Project Manager & Development Team Lead Portfolio",
  description: "Portfolio of Sajideen Hassan, a Project Manager and Development Team Lead who bridges the gap between clean code and strategic product delivery. Discover projects, technical competencies, and operations console dashboard.",
  keywords: ["Sajideen Hassan", "Technical Project Manager", "Project Manager", "Development Team Lead", "MERN Stack Developer", "Software Engineer", "Operations Console Portfolio", "Lenis", "GSAP ScrollTrigger"],
  authors: [{ name: "Sajideen Hassan" }],
  openGraph: {
    title: "Sajideen Hassan | Technical Project Manager Portfolio",
    description: "Turning Ideas into Successful Digital Products through Strategic Project Management, Technical Leadership, and Cross-Functional Collaboration.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} ${ibmPlexMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-bg-void text-text-primary antialiased selection:bg-[rgba(255,122,51,0.2)] selection:text-signal">
        {children}
      </body>
    </html>
  );
}
