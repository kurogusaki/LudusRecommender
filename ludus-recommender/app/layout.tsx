import type { Metadata } from "next";
import { Jersey_25 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const jersey25 = Jersey_25({
  variable: "--font-jersey25",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ludus Recommender",
  description: "A personal game recommendation and tracking system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jersey25.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main style={{ flex: 1, width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 4rem" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );  
}