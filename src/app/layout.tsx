import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import "@/styles/custom.css";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/common/navbar/Navbar.component";
import { Toaster } from "react-hot-toast";

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${readexPro.className} antialiased`}>
        <AuthProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
