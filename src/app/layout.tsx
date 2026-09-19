import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Video Editor & Software Engineer",
  description:
    "A CS engineering student who edits stories and builds software. Explore video editing work and software projects.",
  openGraph: {
    title: "Portfolio — Video Editor & Software Engineer",
    description:
      "A CS engineering student who edits stories and builds software.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#FAFAF8] text-[#1a1a1a]">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
