import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "OneYoto | Agentic AI & Digital Twin in Healthcare",
  description:
    "An interactive presentation module on the global advancements of Agentic AI and Digital Twins in healthcare — by Srinivasan Ramanujam.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <div className="brand-bg" />
        <div className="brand-grid" />
        {children}
      </body>
    </html>
  );
}
