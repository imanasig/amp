import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./providers/ConvexClientProvider";
import { NavBar } from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMPLIFY - AI-Powered Answer Sheet Evaluation",
  description: "Revolutionizing answer sheet evaluation through intelligent textbook-based assessment",
  keywords: "education, AI, evaluation, assessment, textbook, grading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NavBar />
        <main className="flex-grow pt-20">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </main>
        <footer className="bg-zinc-900 text-white py-10 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  <span className="text-blue-500">A</span>MPLIFY
                </h3>
                <p className="text-zinc-300 text-sm">
                  Revolutionizing answer sheet evaluation through intelligent textbook-based assessment.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                  <li><a href="/upload-pdf" className="hover:text-blue-400 transition-colors">Upload PDF</a></li>
                  <li><a href="/Evaluation" className="hover:text-blue-400 transition-colors">Evaluation</a></li>
                </ul>
              </div>
              
            </div>
            <div className="border-t border-zinc-700 mt-8 pt-8 text-center text-zinc-400 text-sm">
              © {new Date().getFullYear()} AMPLIFY. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
