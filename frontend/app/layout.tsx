import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthInitializer from "@/components/AuthInitilazer/AuthInitializer";
import { Toaster } from "sonner";
// import GlobalLoader from "@/components/GlobalLoader/GlobalLoader";
import ServerWarmup from "@/components/ServerWarmup/ServerWarmup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEVQUEST",
  description: "Cool amazing great app to improve all u ever wanted",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <AuthInitializer />

        <Header />

        <main className="flex-1">{children}</main>

        <Toaster richColors position="bottom-right" />

        <Footer />
      </body>
      {/* <GlobalLoader /> */}
      <ServerWarmup />
    </html>
  );
}
