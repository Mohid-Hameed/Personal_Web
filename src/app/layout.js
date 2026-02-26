import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/animations.css";
import ThemeRegistry from "../components/providers/ThemeRegistry";
import { DEMO_PORTFOLIO_DATA } from "../constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Portfolio",
  description: "Professional portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
        <ThemeRegistry demoData={DEMO_PORTFOLIO_DATA}>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
