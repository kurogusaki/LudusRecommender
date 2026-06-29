import type { Metadata } from "next";
import {
    Orbitron,
    Audiowide,
    Rajdhani,
    Oxanium,
    Chakra_Petch,
    Exo_2,
    Michroma,
    Russo_One,
    Syncopate,
    Monoton,
    Press_Start_2P,
    Jersey_25,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const jersey25 = Jersey_25({
  variable: "--font-jersey25",
  subsets: ["latin"],
  weight: ["400"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const monoton = Monoton({
  variable: "--font-monoton",
  subsets: ["latin"],
  weight: "400",
});

const russo = Russo_One({
  variable: "--font-russo",
  subsets: ["latin"],
  weight: "400",
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pressstart",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ludus Recommender",
  description: "A personal game recommendation and tracking system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jersey25.variable}`} suppressHydrationWarning>
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