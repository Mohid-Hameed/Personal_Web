import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/animations.css";
import ThemeRegistry from "../components/providers/ThemeRegistry";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { AppReadyProvider } from "../context/AppReadyContext";
import { DialogOpenProvider } from "../context/DialogOpenContext";
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
  title: "Mohid Hameed",
  description: "Professional Portfolio",
  keywords: [
    "Mohid Hameed",
    "Portfolio",
    "Fullstack Software Engineer",
    "React Developer",
    "Node.js Developer",
    "SQL Developer",
    "MongoDB Developer",
    "RESTful API Developer",
    "Fullstack Developer",
    "Software Engineer",
    "Developer",
    "Engineer",
    "Software",
    "Engineering",
    "Development",
    "Programming",
    "Code",
    "Software Development",
    "Software Engineering",
    "Software Development Engineer",
    "Software Engineering Engineer",
    "Software Development Engineer in Test",
    "Software Engineering Engineer in Test",
  ],
  authors: [
    {
      name: "Mohid Hameed",
      url: "https://mohid-hameed.github.io/Personal_Web/",
    },
  ],
  creator: "Mohid Hameed",
  publisher: "Mohid Hameed",
  openGraph: {
    title: "Mohid Hameed",
    description: "Professional Portfolio",
    url: "https://mohidhameed.github.io/Personal_Web/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
      >
        <AppReadyProvider>
          <DialogOpenProvider>
            <ThemeRegistry demoData={DEMO_PORTFOLIO_DATA}>{children}</ThemeRegistry>
            <LoadingOverlay />
          </DialogOpenProvider>
        </AppReadyProvider>
      </body>
    </html>
  );
}
