import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";
import Suspenses from "@/components/Suspenses";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LawBot - AI Legal Assistant",
  description: "Get answers to your legal questions with LawBot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Suspenses>
            <Navbar />
            {children}
            <Toaster position="top-right" />
          </Suspenses>
        </SessionWrapper>

      </body>
    </html>
  );
}